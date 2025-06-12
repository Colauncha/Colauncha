from jinja2 import Environment, FileSystemLoader, select_autoescape
import os


def get_html_template(template_name, **kwargs):
    template = Environment(
        loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), '../templates')),
        autoescape=select_autoescape(['html', 'xml'])
    )
    template = template.get_template(template_name)
    return template.render(kwargs)


def paginator(page, item_per_page) -> int:
    return (page - 1) * item_per_page if page != 1 else 0
