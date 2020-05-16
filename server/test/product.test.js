const request = require('supertest')
const app = require('../app')
let access_token = ""
let productId;
const ProductName = "Quiet"
const ProductPrice = 58000
const ProductImageUrl = "https://farm8.staticflickr.com/7094/7211171778_2c03b83759_b.jpg"
const ProductStock = 7
const User_name = 'abc'
const User_email = 'abc@email.com'
const User_password = 'abc'
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {

    queryInterface
        .bulkDelete('Products', {})
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })

    queryInterface
        .bulkDelete('Users', {})
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

beforeAll(done => {
    request(app)
        .post('/register')
        .send({
            name: User_name,
            email: User_email,
            password: User_password
        })
        .then(response => {
            const { body } = response
            access_token = body.access_token
            done()
        })
        .catch(err => done(err))
})
describe('Product Test', () => {
    describe('get product(s)', () => {
        test("Successfully get product(s) with status code 200", (done) => {
            request(app)
                .get("/product")
                .set('access_token', access_token)
                .send()
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })


    describe('post a product', () => {
        test("Successfully post a product with status code 201", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    productId = body.id
                    expect(body).toHaveProperty('id')
                    expect(body).toHaveProperty('name', ProductName)
                    expect(body).toHaveProperty('image_url', ProductImageUrl)
                    expect(body).toHaveProperty('price', ProductPrice)
                    expect(body).toHaveProperty('stock', ProductStock)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test("Failed to post a product with empty name with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: "",
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.name", "Product name should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with empty image url with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: "",
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.image_url", "Product image not url type/ empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with empty price with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: "",
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with price equal to 0 with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 0,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Minimum price is Rp.1")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with price not in integer with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 'A',
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with empty string in stock with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ""
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with stock not in integer format with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: "A"
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with name equal to null with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.name", "Product name should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with image_url equal to null with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.image_url", "Product image url should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with price equal to null with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with stock equal to null with status code 400", (done) => {
            request(app)
                .post("/product")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })

    describe('get a product by id', () => {
        test("Successfully get a product by id with status code 200", (done) => {
            request(app)
                .get(`/product/${productId}`)
                .set('access_token', access_token)
                .send()
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id')
                    expect(body).toHaveProperty('name', ProductName)
                    expect(body).toHaveProperty('image_url', ProductImageUrl)
                    expect(body).toHaveProperty('price', ProductPrice)
                    expect(body).toHaveProperty('stock', ProductStock)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test("Failed to get a product by id with status code 404", (done) => {
            request(app)
                .get(`/product/1000`)
                .set('access_token', access_token)
                .send()
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("errorCode", 'DATA_NOT_FOUND')
                    expect(body).toHaveProperty("message", 'Product not found')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })

    describe('update a product', () => {
        test("Successfully update a product with status code 200", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 60000,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name', 'Product Succesfully Updated')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test("Failed to update a product because product not found with status code 404", (done) => {
            request(app)
                .put("/product/1000")
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 60000,
                    stock: ProductStock,
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("errorCode", 'DATA_NOT_FOUND')
                    expect(body).toHaveProperty("message", 'Product not found')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with empty name with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: "",
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.name", "Product name should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with empty image url with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: "",
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.image_url", "Product image not url type/ empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with empty price with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: "",
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with price equal to 0 with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 0,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Minimum price is Rp.1")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with price not in integer with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: 'A',
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with empty string in stock with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ""
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to update a product with stock not in integer format with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: "A"
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should be filled or should be in integer form/ berbentuk bilangan bulat")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with name equal to null with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: null,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.name", "Product name should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with image_url equal to null with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: null,
                    price: ProductPrice,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.image_url", "Product image url should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with price equal to null with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: null,
                    stock: ProductStock
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.price", "Price should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        test("Failed to post a product with stock equal to null with status code 400", (done) => {
            request(app)
                .put(`/product/${productId}`)
                .set('access_token', access_token)
                .send({
                    name: ProductName,
                    image_url: ProductImageUrl,
                    price: ProductPrice,
                    stock: null
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("errorCode", 'VALIDATION_ERROR')
                    expect(body).toHaveProperty("message")
                    expect(body).toHaveProperty("message.stock", "Stock should not be empty")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })

    describe('delete product', () => {
        test('successfully delete a product with status code 200', (done) => {
            request(app)
                .delete(`/product/${productId}`)
                .set('access_token', access_token)
                .send()
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("name", "Product successfully deleted")
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test("Failed to delete a product with status code 404", (done) => {
            request(app)
                .put("/product/1000")
                .set('access_token', access_token)
                .send()
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("errorCode", 'DATA_NOT_FOUND')
                    expect(body).toHaveProperty("message", 'Product not found')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})