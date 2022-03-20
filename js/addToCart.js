$(cards).on('click', (e) => {
    addToCart(e)
})

const addToCart = (e) => {
    const buttonChecked = e.target.classList.contains('buttonBuy')
    buttonChecked ? setCart(e.target.parentElement) : null;
    if (buttonChecked) {
        Swal.fire({
            position: 'top-start',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            toast: true,
            timer: 1000
          })
    }
    e.stopPropagation()
}

items.addEventListener('click', (e) => {
    actionBtn(e)
})

const setCart = (object) => {
    const productCart = {
        id: object.querySelector('.buttonBuy').dataset.id,
        title: object.querySelector('h5').textContent,
        precio : object.querySelector('p').textContent,
        cantidad : 1
    }

    carrito.hasOwnProperty(productCart.id) ? productCart.cantidad = carrito[productCart.id].cantidad + 1 : null;

    carrito[productCart.id] = {...productCart}
    showCart()
}

const showCart = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(product => {
        cartTemplate.querySelector('th').textContent = product.id 
        cartTemplate.querySelector('.title').textContent = product.title 
        cartTemplate.querySelector('.quantity').textContent = product.cantidad 
        cartTemplate.querySelector('.add').dataset.id = product.id
        cartTemplate.querySelector('.remove').dataset.id = product.id
        cartTemplate.querySelector('span').textContent = product.cantidad * product.precio

        const clone = cartTemplate.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    
    showFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const showFooter = () => {
    footer.innerHTML = ''
    const checkCart = Object.keys(carrito).length
    if (checkCart === 0 ) {
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const nQuantity = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0 )
    const nPrice = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0 )

    footerTemplate.querySelector('.total-products').textContent = nQuantity
    footerTemplate.querySelector('span').textContent = nPrice
    // Contador productos al lado del carrito
    document.querySelector('.numeroItems').textContent = nQuantity
    document.querySelector('.numeroItemsMobile').textContent = nQuantity

    const clone = footerTemplate.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    $('#vaciar-carrito').on('click',() => {
        carrito = {}
        showCart()
    })
}

const actionBtn = (e) => {
    const addButton = e.target.classList.contains('add')
    const removeButton = e.target.classList.contains('remove')

    if (addButton) {
        const product = carrito[e.target.dataset.id]
        product.cantidad++
        carrito[e.target.dataset.id] = {...product}
        showCart()
    }

    if (removeButton) {
        const product = carrito[e.target.dataset.id]
        product.cantidad--
        product.cantidad === 0 ? delete carrito[e.target.dataset.id] : null
        showCart();
    }

    e.stopPropagation()
}
