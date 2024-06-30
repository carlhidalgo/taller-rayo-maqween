
from django.http import HttpResponse, HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import cliente, Bateria, CarritoItem
from django.db.utils import IntegrityError
from django.contrib.auth import authenticate
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
import json   #para leer json
from django.conf import settings #parte para finalizar la compra


# Create your views here.
def index(request):
    return render(request, 'myapp/index.html')

def contacto(request):
    return render(request, 'myapp/contacto.html')

def servicios(request):
    return render(request, 'myapp/servicios.html')

def nosotros(request):
    return render(request, 'myapp/nosotros.html')

def productos(request):
    return render(request, 'myapp/productos.html')

def reservar(request):
    return render(request, 'myapp/reservar.html')

def base(request):
    return render(request, 'myapp/base.html')

def recuperar(request):
    return render(request, 'myapp/recuperar.html')

def perfil(request):
    return render(request, 'myapp/perfil.html')

def modificar(request):
    return render(request, 'myapp/modificar.html')

def eliminar(request):
    return render(request, 'myapp/eliminar.html')


def baterias(request):
    return render(request, 'myapp/baterias.html')


def baterias_vista(request):
    baterias = Bateria.objects.all()
    return render(request, 'myapp/baterias.html', {'baterias': baterias})

def finalizar_compra(request):
    return render(request, 'myapp/finalizar_compra.html')


def cliente_agregar(request):
    if request.method == "POST":
        nombre = request.POST.get("nombre")
        apellido = request.POST.get("apellido")
        rut = request.POST.get("rut")
        email = request.POST.get("email")
        contrasena = request.POST.get("contrasena")
        url= request.META.get('HTTP_REFERER')
        ultima_parte_url=url.split('/')[-1]
        try:
            obj = cliente.objects.create(
                nombre=nombre,
                apellido=apellido,
                rut=rut,
                email=email,
                contrasena=contrasena
            )
            mensaje = "Cuenta creada exitosamente"
            return render(request, 'myapp/'+ultima_parte_url+'.html', {'mensaje': mensaje})
        
        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                mensaje = "El rut o correo electrónico ya están en uso."
            else:
                mensaje = "Error al ingresar el cliente."
            
            return render(request, 'myapp/'+ultima_parte_url+'.html', {'mensaje': mensaje})

    else:
        mensaje = "Error"
        return render(request, 'myapp/index.html')
    

def login_vista(request):
    url= request.META.get('HTTP_REFERER')
    ultima_parte_url=url.split('/')[-1]

    
    if request.method == 'POST':
        correo = request.POST.get('correo')
        contrasena = request.POST.get('contrasena')
        
        # Autenticar al cliente manualmente
        try:
            cliente_ = cliente.objects.get(email=correo, contrasena=contrasena)
            request.session['cliente_id'] = cliente_.rut
            return redirect('perfil')  # Redirige a la página de contacto
            
        except cliente.DoesNotExist:
            mensaje = "Correo electrónico o contraseña incorrectos."
            return render(request, 'myapp/'+ultima_parte_url+'.html', {'mensaje': mensaje})         # Si el cliente no puede ser autenticado, manda un error
    return render(request, 'myapp/index.html')

def logout_vista(request):
    try:
        del request.session['cliente_id']
    except KeyError:
        pass
    return redirect('index')

def eliminar_cuenta(request):
    if request.method == 'POST':
        cliente_id = request.session.get('cliente_id')
        if cliente_id:
            try:
                cliente_obj = cliente.objects.get(rut=cliente_id)
                # Aquí puedes agregar una lógica adicional para verificar la contraseña o confirmación

                contrasena = request.POST.get('contrasena', '')
                if cliente_obj.contrasena == contrasena:
                    cliente_obj.delete()
                    del request.session['cliente_id']
                    messages.success(request, 'Cuenta eliminada exitosamente.')
                    return redirect('index')  # Redirigir a la página de inicio u otra página deseada después de eliminar
                else:
                    messages.error(request, 'Contraseña incorrecta. La cuenta no ha sido eliminada.')
            except cliente.DoesNotExist:
                messages.error(request, 'No se encontró el cliente.')
        else:
            messages.error(request, 'No hay cliente autenticado.')
    
    return render(request, 'myapp/eliminar.html')  # Renderizar el template para eliminar la cuenta

def agregar_al_carrito(request):
    if request.method == 'POST':
        cliente_rut = request.session.get('cliente_id')
        cantidad = request.POST.get('cantidad')
        product_id = request.POST.get('object_id')
        # Verificar si el cliente está autenticado
        if cliente_rut:
            try:
                # Obtener el cliente
                cliente_obj= cliente.objects.get(rut=cliente_rut)
                print(cliente_obj)
                # Obtener la batería (producto)
                bateria = Bateria.objects.get(id=product_id)
                print(bateria)
                # Obtener el tipo de contenido para Bateria
                content_type = ContentType.objects.get_for_model(Bateria)
                print(content_type)
                # Crear o actualizar el item en el carrito
                carrito_item, created = CarritoItem.objects.get_or_create(
                    cliente=cliente_obj,
                    content_type=content_type,
                    object_id=bateria.id,
                    cantidad=cantidad
                )

                if created:
                    messages.success(request, 'Producto agregado al carrito.')
                else:
                    carrito_item.cantidad += int(cantidad)
                    carrito_item.save()
                    messages.success(request, 'Cantidad actualizada en el carrito.')

                return redirect('baterias')  # Redirigir a la vista del carrito
            except Bateria.DoesNotExist:
                messages.error(request, 'La batería seleccionada no existe.')
                return redirect('baterias')  # Redirigir a donde sea necesario en caso de error
            except cliente.DoesNotExist:
                messages.error(request, 'No se encontró el cliente.')
                return redirect('index')  # Redirigir a la página de inicio o a la página de inicio de sesión si no hay cliente autenticado

        else:
            messages.error(request, 'Debe iniciar sesión para agregar productos al carrito.')
            return redirect('index')  # Redirigir a la página de inicio o a la página de inicio de sesión

    return redirect('index')

    
  
def vista_carrito(request):
    cliente_id = request.session.get('cliente_id')
    
    if not cliente_id:
        return redirect('index')  # Redirigir al login si el cliente no está autenticado

    try:
        cliente_obj = cliente.objects.get(rut=cliente_id)
        carrito_items = CarritoItem.objects.filter(cliente=cliente_obj)
        if not carrito_items.exists():  #si no hay items en el carrito no pasa a la compra
            return render(request, 'myapp/productos.html', {'mensaje': 'carrito vacio'}) 
        else:
        # Calcular el total de cada ítem y el total general
            for item in carrito_items:
                item.total = item.content_object.precio * item.cantidad
            
            total_general = sum(item.total for item in carrito_items)
            
            return render(request, 'myapp/carrito.html', {  # Asegúrate de que el nombre del archivo sea correcto
                'carrito_items': carrito_items,
                'total_general': total_general
            })
    except cliente.DoesNotExist:
        return redirect('index')  


def eliminar_del_carrito(request, item_id):
    item = get_object_or_404(CarritoItem, id=item_id)
    item.delete()
    return redirect('carrito')

def actualizar_carrito(request, item_id):
    item = get_object_or_404(CarritoItem, id=item_id)
    if request.method == 'POST':
        nueva_cantidad = int(request.POST.get('cantidad', 1))
        item.cantidad = nueva_cantidad
        item.save()
    return redirect('carrito')

#finalizar la compra:
def finalizar_comprax(request):
    cliente_id = request.session.get('cliente_id')
    if not cliente_id:
        return redirect('index')
    try:
        cliente_obj = cliente.objects.get(rut=cliente_id)
        carrito_items = CarritoItem.objects.filter(cliente=cliente_obj)
        if not carrito_items.exists():  #si no hay items en el carrito no pasa a la compra
            return render(request, 'myapp/finalizar_compra.html', {'mensaje': 'carrito vacio'}) 
        else:     
            if request.method == 'POST':
                numero_tarjeta = request.POST.get('numero_tarjeta')
                print(numero_tarjeta)
                cvv = request.POST.get('cvv')
                print(cvv)
                contrasena = request.POST.get('contrasena')
                print(contrasena)

                with open(settings.BASE_DIR / 'myapp/tarjetas.json', 'r') as file:
                    tarjetas = json.load(file)
                    print("1")
                    print(tarjetas)
                tarjeta_valida = False
                for tarjeta in tarjetas:
                    print(tarjeta['numero_tarjeta'])
                    print(tarjeta['cvv'])
                    print(tarjeta['contrasena'])
                    if (tarjeta['numero_tarjeta'] == numero_tarjeta and tarjeta['cvv'] == cvv and tarjeta['contrasena'] == contrasena):
                        print("bandera pasa tarjeta")
                        tarjeta_valida = True
                        total_compra = sum(item.content_object.precio * item.cantidad for item in carrito_items)
                        if tarjeta['monto'] < total_compra:
                            return render(request, 'myapp/finalizar_compra.html', {'mensaje': 'Dinero insufuciente'})      
                        else:
                            for item in carrito_items:
                                item.content_object.cantidad -= item.cantidad
                                item.content_object.save()
                            tarjeta['monto'] = float(tarjeta['monto'] - total_compra)#descuenta dinero de la tarjeta
                            with open(settings.BASE_DIR / 'myapp/tarjetas.json', 'w') as file: #abre la tarjeta y descuenta el dinero de la tarjeta
                                json.dump(tarjetas, file)  
                            carrito_items.delete() #elimina los items del carrito
                            print("ok pagado") # a modo de control interno por consola
                            return render(request, 'myapp/finalizar_compra.html', {'mensaje': 'Compra finalizada con éxito'})  # se puede depurar, muestra mensaje de compra ok     


                if not tarjeta_valida:
                    print("xx")
                    return render(request, 'myapp/finalizar_compra.html', {'mensaje': 'Datos de tarjeta incorrectos'})                      
        return render(request, 'myapp/finalizar_compra.html')
    except cliente.DoesNotExist:
        return redirect('index')