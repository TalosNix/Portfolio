#!/usr/bin/env python3
"""
sync_ctf.py
------------------------------------------------------------------
Sincroniza las máquinas/salas COMPLETADAS en HackTheBox y TryHackMe
y las escribe en data/ctf-machines.json, SIN guardar en ningún
momento tu usuario/alias de esas plataformas en el repositorio.

Se ejecuta desde GitHub Actions (ver .github/workflows/sync-ctf.yml),
usando credenciales guardadas como Secrets (cifrados, nunca visibles
en el código ni en los logs).

Variables de entorno esperadas:
  HTB_APP_TOKEN     -> Token de App de HackTheBox (Bearer)
  HTB_PROFILE_ID    -> Tu ID numérico de perfil en HTB
  THM_USERNAME      -> Tu nombre de usuario de TryHackMe (ver README)

Cualquiera de las dos plataformas es opcional: si faltan sus
variables, esa plataforma simplemente se omite (no falla el script).
------------------------------------------------------------------
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "ctf-machines.json")

HEADERS_COMMON = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) talos-portfolio-sync/1.0"
}

# HTB numeric difficulty -> etiqueta legible (aprox. según la escala pública de HTB)
HTB_DIFFICULTY_MAP = [
    (0, 25, "Fácil"),
    (25, 50, "Media"),
    (50, 75, "Difícil"),
    (75, 101, "Insane"),
]


def http_get_json(url, headers=None, timeout=20):
    req = urllib.request.Request(url, headers={**HEADERS_COMMON, **(headers or {})})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def find_items_recursive(obj, required_keys):
    """
    Busca recursivamente, en cualquier estructura JSON, todos los
    diccionarios que contengan TODAS las claves de `required_keys`.
    Esto hace el parser tolerante a pequeños cambios de formato en
    APIs no oficiales/no documentadas.
    """
    found = []
    if isinstance(obj, dict):
        if all(k in obj for k in required_keys):
            found.append(obj)
        for v in obj.values():
            found.extend(find_items_recursive(v, required_keys))
    elif isinstance(obj, list):
        for item in obj:
            found.extend(find_items_recursive(item, required_keys))
    return found


def htb_difficulty_label(item):
    for key in ("difficulty_text", "difficultyText", "difficulty_label"):
        if key in item and item[key]:
            return str(item[key]).capitalize()
    if "difficulty" in item:
        try:
            val = float(item["difficulty"])
            for lo, hi, label in HTB_DIFFICULTY_MAP:
                if lo <= val < hi:
                    return label
        except (TypeError, ValueError):
            pass
    return ""


def sync_htb():
    token = os.environ.get("HTB_APP_TOKEN")
    profile_id = os.environ.get("HTB_PROFILE_ID")
    if not token or not profile_id:
        print("[HTB] Variables no configuradas, se omite.")
        return []

    url = f"https://www.hackthebox.com/api/v4/user/profile/progress/machines/os/{profile_id}"
    try:
        data = http_get_json(url, headers={"Authorization": f"Bearer {token}"})
    except urllib.error.HTTPError as e:
        print(f"[HTB] ERROR HTTP {e.code}: comprueba HTB_APP_TOKEN / HTB_PROFILE_ID.", file=sys.stderr)
        return []
    except Exception as e:
        print(f"[HTB] ERROR: {e}", file=sys.stderr)
        return []

    raw_items = find_items_recursive(data, required_keys=["name"])
    machines = []
    seen = set()
    for item in raw_items:
        name = item.get("name")
        if not name or name in seen:
            continue
        # Solo nos interesan entradas que parecen máquinas completadas
        # (tienen algún indicador de dificultad o "completion").
        if not any(k in item for k in ("difficulty", "difficulty_text", "completion_time", "own_time")):
            continue
        seen.add(name)
        machines.append({"nombre": name, "dificultad": htb_difficulty_label(item)})

    print(f"[HTB] {len(machines)} máquinas encontradas.")
    return machines


def sync_thm():
    username = os.environ.get("THM_USERNAME")
    if not username:
        print("[THM] Variable no configurada, se omite.")
        return []

    rooms = []
    seen = set()
    page = 1
    while True:
        url = f"https://tryhackme.com/api/v2/public-profile/completed-rooms?username={username}&limit=50&page={page}"
        try:
            data = http_get_json(url)
        except Exception as e:
            print(f"[THM] ERROR en página {page}: {e}", file=sys.stderr)
            break

        raw_items = find_items_recursive(data, required_keys=["title"])
        if not raw_items:
            raw_items = find_items_recursive(data, required_keys=["name"])

        if not raw_items:
            break

        for item in raw_items:
            title = item.get("title") or item.get("name")
            if not title or title in seen:
                continue
            seen.add(title)
            rooms.append({"nombre": title, "dificultad": ""})

        # Si la página trajo menos de 50, asumimos que es la última.
        if len(raw_items) < 50:
            break
        page += 1
        time.sleep(0.5)
        if page > 20:  # límite de seguridad, evita bucles infinitos
            break

    print(f"[THM] {len(rooms)} salas encontradas.")
    return rooms


def main():
    result = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "maquinas": {}
    }

    htb = sync_htb()
    if htb:
        result["maquinas"]["HackTheBox"] = htb

    thm = sync_thm()
    if thm:
        result["maquinas"]["TryHackMe"] = thm

    if not result["maquinas"]:
        print("Nada que escribir (ninguna plataforma configurada o sin resultados). Abortando sin tocar el archivo.")
        return

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"Escrito {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
