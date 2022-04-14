<?php

namespace App\Resolver;

use App\Repository\PostRepository;
use ApiPlatform\Core\GraphQl\Resolver\QueryCollectionResolverInterface;

class PostCollectionResolver implements QueryCollectionResolverInterface {
    public function __construct(
        private PostRepository $postRepository
    )
    { }

    public function __invoke(iterable $item, array $context): iterable
    {
        return $this->postRepository->findAll();
    }
}