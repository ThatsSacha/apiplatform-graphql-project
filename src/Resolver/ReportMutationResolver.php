<?php

namespace App\Resolver;

use ApiPlatform\Core\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\Report;
use App\Service\ReportService;
use Doctrine\ORM\EntityManager;

class ReportMutationResolver implements MutationResolverInterface {
    public function __construct(
        private ReportService $reportService
    )
    { }

    public function __invoke($item, array $context): Report
    {
        return $this->reportService->verifyReportAndSetPost($item);
    }
}