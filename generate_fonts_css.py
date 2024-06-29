import os


def generate_css(directory):
    css_entries = []
    for filename in os.listdir(directory):
        if filename.endswith('.ttf') or filename.endswith('.otf'):
            font_family = os.path.splitext(filename)[0].replace('_', ' ').title()
            css_entry = f"""@font-face {{
    font-family: '{font_family}';
    src: url('../assets/f/{filename}');
}}"""
            css_entries.append(css_entry)

    css_content = "\n\n".join(css_entries)
    css_file_path = os.path.join(directory, "fonts.css")
    with open(css_file_path, "w") as css_file:
        css_file.write(css_content)
    return css_file_path


# Directory for your fonts
directory = r""
generate_css(directory)
