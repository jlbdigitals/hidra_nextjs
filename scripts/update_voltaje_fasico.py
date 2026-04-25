#!/usr/bin/env python3
import json
import sys

PRODUCTS_FILE = "public/products.json"
BACKUP_FILE = "public/products_backup.json"

MONOFASICAS = {"220", "220V", "230", "230V", "240", "240V"}
TRIFASICAS = {"380", "380V", "400", "400V", "600", "600V", "220/380", "220/380V", "220V/380V", "230/400", "230/400V"}

def get_fasico(voltajes):
    """Determina si es monofásica o trifásica basándose en los voltajes."""
    if not voltajes:
        return ""
    for v in voltajes:
        v_clean = v.strip().replace("V", "").replace("v", "")
        if v_clean in MONOFASICAS or v in MONOFASICAS:
            return "Monofásica"
        if v_clean in TRIFASICAS or v in TRIFASICAS:
            return "Trifásica"
    return ""

def main():
    action = sys.argv[1] if len(sys.argv) > 1 else "apply"

    with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
        products = json.load(f)

    if action == "backup":
        with open(BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(products, f, ensure_ascii=False, indent=2)
        print(f"✅ Backup guardado en {BACKUP_FILE}")
        return

    if action == "restore":
        with open(BACKUP_FILE, "r", encoding="utf-8") as f:
            products = json.load(f)
        with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
            json.dump(products, f, ensure_ascii=False, indent=2)
        print(f"✅ Restaurado desde {BACKUP_FILE}")
        return

    if action == "preview":
        print("📋 Preview de cambios (no modifica nada):")
        for p in products:
            voltajes = p.get("voltaje", [])
            current_fasico = p.get("fasico", "")
            new_fasico = get_fasico(voltajes)
            if new_fasico and new_fasico != current_fasico:
                print(f"  [{p['id']}] {p['nombre'][:60]:<60} | voltajes: {voltajes} → {new_fasico}")
        return

    # apply
    changed = 0
    for p in products:
        voltajes = p.get("voltaje", [])
        new_fasico = get_fasico(voltajes)
        if new_fasico:
            p["fasico"] = new_fasico
            changed += 1

    with open(PRODUCTS_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    print(f"✅ Aplicado: {changed} productos actualizados con campo 'fasico'")

if __name__ == "__main__":
    main()