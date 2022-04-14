<?php

namespace App\Service;

use App\Entity\Report;
use App\Repository\ReportRepository;

class ReportService {
    public function __construct(
        private ReportRepository $reportRepository
    ) { }

    public function verifyReportAndSetPost(Report $item): Report {
        $reports = $this->reportRepository->findBy(['post' => $item->getPost()]);

        if (count($reports) === 4) {
            $item->getPost()->setIsHidden(true);
        }

        return $item;
    }
}