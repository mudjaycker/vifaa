import os
import re

# --------------------------
# 1. Extraire les classes HTML/JS/Vue/Svelte
# --------------------------
def extract_used_classes_from_file(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # capture toutes les classes dans les attributs class="..."
    pattern_html = r'class\s*=\s*"([^"]+)"'
    matches = re.findall(pattern_html, content)

    used = set()
    for match in matches:
        for cls in match.split():
            used.add(cls.strip())

    # capture les classes dans les fichiers JS/Vue/Svelte (ex: class: "box")
    pattern_js = r'class[:=]\s*"([^"]+)"'
    matches2 = re.findall(pattern_js, content)

    for match in matches2:
        for cls in match.split():
            used.add(cls.strip())

    return used


def extract_all_used_classes(directory):
    used_classes = set()
    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith((".html", ".js", ".vue", ".svelte")):
                file_path = os.path.join(root, filename)
                used_classes |= extract_used_classes_from_file(file_path)
    return used_classes



# --------------------------
# 2. Extraire les classes définies dans le CSS
# --------------------------
def extract_css_class_selectors(css_content):
    # Ex: .box, .menu-item, .title:hover
    pattern = r'\.([a-zA-Z_][a-zA-Z0-9\-_]*)'
    return set(re.findall(pattern, css_content))


# --------------------------
# 3. Garder uniquement les règles CSS utilisées
# --------------------------
def purge_css(css_path, used_classes, output_path="purged.css"):
    with open(css_path, "r", encoding="utf-8", errors="ignore") as f:
        css = f.read()

    # découpe le CSS en blocs (chaque sélecteur + son contenu)
    # Ex :  ".box { ... }"
    blocks = re.findall(r'([^\{]+\{[^}]+\})', css, re.DOTALL)

    kept_css = ""

    for block in blocks:
        selectors = block.split("{")[0]  # partie avant le {
        # trouve toutes les classes dans le sélecteur
        classes_in_block = set(re.findall(r'\.([a-zA-Z_][a-zA-Z0-9\-_]*)', selectors))

        # si au moins une classe du bloc est utilisée -> garder le bloc
        if any(c in used_classes for c in classes_in_block):
            kept_css += block + "\n\n"

    # write output
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(kept_css)

    print(f"✔ CSS purgé généré : {output_path}")
    print(f"✔ Classes utilisées dans le projet : {len(used_classes)}")



# --------------------------
# 4. Exemple d'utilisation
# --------------------------
if __name__ == "__main__":
    project_folder = "./test"      # dossier contenant HTML/JS/Vue/etc
    css_file = "./test/style.css"             # fichier à nettoyer

    used = extract_all_used_classes(project_folder)
    purge_css(css_file, used, "purged.css")