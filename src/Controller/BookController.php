<?php
  
namespace App\Controller;
  
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Book;
  
/**
 * @Route("/api", name="api_")
 */
class BookController extends AbstractController
{
    /**
     * @Route("/book", name="book_index", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        $products = $doctrine->getRepository(Book::class)->findAll();
            
  
        $data = [];
  
        foreach ($products as $product) {
           $data[] = [
               'id' => $product->getId(),
               'title' => $product->getTitle(),
               'author' => $product->getAuthor(),
               'content' => $product->getContent(),
               'genre' => $product->getGenre(),
           ];
        }
  
  
        return $this->json($data);
    }
  
    /**
     * @Route("/book", name="book_new", methods={"POST"})
     */
    public function new(Request $request, ManagerRegistry $doctrine ): Response
    {
        $entityManager = $doctrine->getManager();
  
        $book = new Book();
        $book->setTitle($request->request->get('title'));
        $book->setAuthor($request->request->get('author'));
        $book->setContent($request->request->get('content'));
        $book->setGenre($request->request->get('genre'));

  
        $entityManager->persist($book);
        $entityManager->flush();
  
        return $this->json('Created new book successfully with id ' . $book->getId());
    }
  
    /**
     * @Route("/book/{id}", name="book_show", methods={"GET"})
     */
    public function show(int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $book = $entityManager->getRepository(Book::class)->find($id);
            
        if (!$book) {
  
            return $this->json('No book found for id' . $id, 404);
        }
  
        $data =  [
            'id' => $book->getId(),
            'title' => $book->getTitle(),
            'author' => $book->getAuthor(),
            'content' => $book->getContent(),
            'genre' => $book->getGenre(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/book/{id}", name="book_edit", methods={"PUT", "PATCH"})
     */
    public function edit(Request $request, int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $book = $entityManager->getRepository(Book::class)->find($id);
  
        if (!$book) {
            return $this->json('No book found for id' . $id, 404);
        }
         
        $content = json_decode($request->getContent());
         

        $book->setTitle($content->title);
        $book->setAuthor($content->author);
        $book->setContent($content->content);
        $book->setGenre($content->genre);
        $entityManager->flush();
  
        $data =  [
            'id' => $book->getId(),
            'title' => $book->getTitle(),
            'author' => $book->getAuthor(),
            'content' => $book->getContent(),
            'genre' => $book->getGenre(),
        ];
          
        return $this->json($data);
    }
  
    /**
     * @Route("/book/{id}", name="book_delete", methods={"DELETE"})
     */
    public function delete(int $id, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $book = $entityManager->getRepository(Book::class)->find($id);
  
        if (!$book) {
            return $this->json('No book found for id' . $id, 404);
        }
  
        $entityManager->remove($book);
        $entityManager->flush();
  
        return $this->json('Deleted a book successfully with id ' . $id);
    }
  
  
}