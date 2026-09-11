const productList =
    document.getElementById("product-list");

const searchInput =
    document.getElementById("searchInput");

let selectedCategory = "All";

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(list) {

    if (!productList) return;

    productList.innerHTML = "";

    if (list.length === 0) {

        productList.innerHTML = `
            <div class="no-products">
                <h2>😔 No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    list.forEach((product, index) => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.style.animationDelay =
            `${index * 0.08}s`;


        card.innerHTML = `

            <div class="product-image">

                <span class="discount">
                    SALE
                </span>

                <button
                    class="wishlist"
                    onclick="wishlist(event)"
                >
                    ♡
                </button>

                <div class="product-emoji">
                    ${product.emoji}
                </div>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="product-bottom">

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        + Cart
                    </button>

                </div>

            </div>

        `;

        card.onclick = function(event) {

            if (
                event.target.tagName !== "BUTTON"
            ) {

                window.location.href =
                    `product.html?id=${product.id}`;

            }

        };


        productList.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

function filterProducts() {

    const search =
        searchInput
        ? searchInput.value.toLowerCase()
        : "";


    const filtered =
        products.filter(product => {

            const matchesSearch =  product.name.toLowerCase().includes(search);
            const matchesCategory =selectedCategory === "All" ||product.category === selectedCategory;
            return ( matchesSearch && matchesCategory   );
        });
    displayProducts(filtered);
}
if (searchInput) {

    searchInput.addEventListener( "input", filterProducts  );

}

const filters =
    document.querySelectorAll(".filter");


filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );


        button.classList.add("active");


        selectedCategory =
            button.dataset.category;


        filterProducts();

    });

});


/* =========================
   CART
========================= */

function addToCart(id) {

    const product =
        products.find(item =>
            item.id === id
        );


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        `${product.name} added to cart 🛒`
    );

}


function updateCartCount() {

    const counters =
        document.querySelectorAll(
            "#cart-count"
        );


    counters.forEach(counter => {

        counter.textContent =
            cart.length;

    });

}


/* =========================
   WISHLIST
========================= */

function wishlist(event) {

    event.stopPropagation();

    const button =
        event.currentTarget;

    button.textContent = "♥";

    button.classList.add(
        "liked"
    );

}


/* =========================
   PRODUCT DETAILS
========================= */

const productDetails =
    document.getElementById(
        "product-details"
    );


if (productDetails) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    const product =
        products.find(
            item => item.id === id
        );


    if (product) {

        productDetails.innerHTML = `

            <div class="detail-card">

                <div class="detail-image">

                    <div class="big-emoji">
                        ${product.emoji}
                    </div>

                </div>


                <div class="detail-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h1>
                        ${product.name}
                    </h1>

                    <div class="detail-rating">
                        ⭐ ${product.rating}
                        <span>
                            Excellent Rating
                        </span>
                    </div>

                    <h2 class="detail-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </h2>

                    <p class="description">
                        ${product.description}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(-1)"
                        >
                            −
                        </button>

                        <span id="quantity">
                            1
                        </span>

                        <button
                            onclick="changeQuantity(1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="buy-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>


                    <div class="delivery">

                        🚚 Free Delivery<br>

                        🔒 Secure Payment<br>

                        ↩️ Easy Returns

                    </div>

                </div>

            </div>

        `;

    }

}


let quantity = 1;


function changeQuantity(value) {

    quantity += value;


    if (quantity < 1) {
        quantity = 1;
    }


    const element =
        document.getElementById(
            "quantity"
        );


    if (element) {

        element.textContent =
            quantity;

    }

}


/* INITIALIZE */

updateCartCount();


if (productList) {

    displayProducts(products);

}