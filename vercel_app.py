import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nombre_de_tu_proyecto.settings')

app = get_wsgi_application()