<?php

namespace App\Service;

use App\Entity\Report;
use App\Repository\ReportRepository;

class ReportService {
    public function __construct(
        private ReportRepository $reportRepository
    ) { }
    
    /**
     * @param Report $report
     * 
     * @return Report
     */
    public function verifyReportAndSetPost(Report $report): Report {
        $reports = $this->reportRepository->findBy(['post' => $report->getPost()]);

        if (count($reports) === 4) {
            $report->getPost()->setIsHidden(true);
        }

        return $report;
    }
}