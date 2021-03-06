import Head from 'next/head'
import { useEffect, useState } from 'react'

/**
 * Components.
 */
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import { ProductList } from '../components/Products/List'

/**
 * Services.
 */
import {
  // save,
  findAll,
  Product,
  subscribeToChanges
} from '../services/products'


/**
 * Component.
 */
export default function Home() {
  /**
   * States.
   */
  const [showModal, setShowModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)

  const [product, setProduct] = useState<Product>()
  const [products, setProducts] = useState<Product[]>()
  const [productName, setProductName] = useState('')

  /**
   * Functions.
   */
  const getAllProducts = async () => {
    const products = await findAll()
    setProducts(products)
  }

  // const handlePressToEdit = (doc: PouchProduct) => {
  //   setProduct(doc)
  //   setShowModal(true)
  // }

  const onFieldChanges = (value: string) => {
    setProductName(value)
  }

  const unShow = (toast: 'success' | 'error') => {
    const fn = {
      'success': setShowSuccessToast,
      'error': setShowErrorToast
    }

    fn[toast](false)
  }

  const saveProductName = async () => {
    if(!product || !productName) return

    try {
      // const { id: _id, doc } = product

      // await save({
      //   _id,
      //   _rev: doc._rev,
      //   ...doc,
      //   description: productName,
      //   updatedAt: new Date().toISOString()
      // })

      setShowSuccessToast(true)
    } catch {
      setShowErrorToast(true)
    } finally {
      setShowModal(false)
    }
  }

  /**
   * Effects.
   */
  useEffect(function () {
    getAllProducts()
  }, [])

  useEffect(function () {
    subscribeToChanges({
      since: 'now',
      live: true
    }).on('change', getAllProducts)
  }, [])

  // useEffect(function () {
  //   if (!product) return

  //   setProductName(product?.doc?.description)
  // }, [product])

  /**
   * JSX.
   */
  return (
    <>
      <Head>
        <title>Testando CouchDB</title>
        <meta name="description" content="POC com CouchDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal centered size="sm" show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Produto
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="product.name">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(event) => onFieldChanges(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>

          <Button onClick={() => saveProductName()}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        autohide
        show={showSuccessToast}
        onClose={() => unShow('success')}
        style={{ position: 'absolute', top: 60, right: 10 }}
      >
        <Toast.Header>
          Produto
        </Toast.Header>

        <Toast.Body>
          Produto atualizado com sucesso!
        </Toast.Body>
      </Toast>

      <Toast
        autohide
        show={showErrorToast}
        onClose={() => unShow('error')}
        style={{ position: 'absolute', top: 60, right: 10 }}
      >
        <Toast.Header>
          Produto
        </Toast.Header>

        <Toast.Body>
          Houve um problema ao atualizar o produto. Por favor, teste novamente!
        </Toast.Body>
      </Toast>

      <main>
        <Navbar bg="dark" variant="dark" sticky="top">
          <Nav className="mr-auto" activeKey="/">
            <Nav.Link href="/">Produtos</Nav.Link>
          </Nav>
        </Navbar>

        <Jumbotron fluid>
          <Container>
            <h1>CouchDB</h1>
            <p>
              Uma POC para validar as funcionalidades do couchDB aplicados a uma PWA.
            </p>
          </Container>
        </Jumbotron>

        <Container>
          <Row>
            <Col>
              <ProductList
                isLoading={!products}
                products={products}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
