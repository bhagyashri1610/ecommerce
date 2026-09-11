const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Accessories",
        price: 2499,
        oldPrice: 3299,
        rating: 4.8,
        reviews: 124,
        image: "🎧",
        discount: "25% OFF"
    },

    {
        id: 2,
        name: "SmartFit Watch Pro",
        category: "Electronics",
        price: 3299,
        oldPrice: 4199,
        rating: 4.7,
        reviews: 128,
        image: "⌚",
        discount: "20% OFF"
    },

    {
        id: 3,
        name: "Premium Laptop",
        category: "Electronics",
        price: 54999,
        oldPrice: 64999,
        rating: 4.9,
        reviews: 87,
        image: "💻",
        discount: "15% OFF"
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "Fashion",
        price: 2199,
        oldPrice: 2999,
        rating: 4.6,
        reviews: 210,
        image: "👟",
        discount: "27% OFF"
    },

    {
        id: 5,
        name: "Classic Sunglasses",
        category: "Fashion",
        price: 899,
        oldPrice: 1299,
        rating: 4.4,
        reviews: 95,
        image: "🕶️",
        discount: "30% OFF"
    },

    {
        id: 6,
        name: "Travel Backpack",
        category: "Accessories",
        price: 1599,
        oldPrice: 2199,
        rating: 4.7,
        reviews: 156,
        image: "🎒",
        discount: "27% OFF"
    },

    {
        id: 7,
        name: "Premium Coffee Mug",
        category: "Home",
        price: 499,
        oldPrice: 699,
        rating: 4.5,
        reviews: 75,
        image: "☕",
        discount: "28% OFF"
    },

    {
        id: 8,
        name: "Modern Desk Lamp",
        category: "Home",
        price: 1299,
        oldPrice: 1799,
        rating: 4.6,
        reviews: 63,
        image: "💡",
        discount: "28% OFF"
    },

    {
        id: 9,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1799,
        oldPrice: 2499,
        rating: 4.5,
        reviews: 143,
        image: "🔊",
        discount: "28% OFF"
    },

    {
        id: 10,
        name: "Casual Hoodie",
        category: "Fashion",
        price: 1499,
        oldPrice: 1999,
        rating: 4.6,
        reviews: 88,
        image: "👕",
        discount: "25% OFF"
    },

    {
        id: 11,
        name: "Smartphone",
        category: "Electronics",
        price: 18999,
        oldPrice: 21999,
        rating: 4.8,
        reviews: 320,
        image: "📱",
        discount: "14% OFF"
    },

    {
        id: 12,
        name: "Home Plant Pot",
        category: "Home",
        price: 699,
        oldPrice: 999,
        rating: 4.3,
        reviews: 52,
        image: "🪴",
        discount: "30% OFF"
    }

];


const productList =
    document.getElementById("product-list");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");


let selectedCategory = "All";


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list) {

    productList.innerHTML = "";

    productCount.textContent = list.length;


    if (list.length === 0) {

        noProducts.style.display = "block";

        return;

    }

    noProducts.style.display = "none";


    list.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span>
                    ${product.image}
                </span>

                <div class="discount">
                    ${product.discount}
                </div>

                <button
                    class="wishlist"
                    onclick="addWishlist()"
                >
                    ♡
                </button>

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">

                    ★★★★★

                    <span>
                        ${product.rating}
                        (${product.reviews})
                    </span>

                </div>


                <div class="price-row">

                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add
                    </button>

                </div>

            </div>

        `;


        card.addEventListener(
            "dblclick",
            () => {

                window.location.href =
                    `product.html?id=${product.id}`;

            }
        );


        productList.appendChild(card);

    });

}


/* ================= FILTER ================= */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                selectedCategory =
                    button.dataset.category;

                filterProducts();

            }
        );

    });


/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* ================= SORT ================= */

sortSelect.addEventListener(
    "change",
    filterProducts
);


function filterProducts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    const sort =
        sortSelect.value;


    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayProducts(filtered);

}


/* ================= CART ================= */

function addToCart(id) {

    let cart =
        JSON.parse(
            localStorage.getItem("shopEaseCart")
        ) || [];


    const existing =
        cart.find(item =>
            item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert("Product added to cart 🛒");
}
function updateCartCount() {
    const cart =
        JSON.parse(
            localStorage.getItem("shopEaseCart")) || [];
    const count =  cart.reduce( (total, item) => total + item.quantity,0);
    const cartCount =document.getElementById( "cart-count");
    if (cartCount) {
        cartCount.textContent = count;
    }
}
function addWishlist() {
    alert(  "Added to wishlist ❤️");
}
displayProducts(products);

updateCartCount();