<?php

namespace Gaspertrix\Backpack\AjaxCrud\App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Backpack\Base\app\Console\Commands\Install as BaseInstall;

class Install extends BaseInstall
{
    protected $progressBar;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gaspertrix:backpack:ajaxcrud:install
                                {--timeout=300 : How many seconds to allow each process to run.}
                                {--debug : Show process output or not. Useful for debugging. }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish assets for Ajax crud';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->progressBar = $this->output->createProgressBar(2);
        $this->progressBar->start();
        $this->info(' Gaspertrix\Backpack\AjacCrud installation started. Please wait...');
        $this->progressBar->advance();

        $this->line(' Publishing assets');
        $this->executeProcess('php artisan vendor:publish --provider="Gaspertrix\Backpack\AjacCrud\AjacCrudServiceProvider" --tag="public"');

        $this->line(' Publishing views');
        $this->executeProcess('php artisan vendor:publish --provider="Gaspertrix\Backpack\AjacCrud\AjacCrudServiceProvider" --tag="views"');

        $this->progressBar->finish();
        $this->info(" Gaspertrix\Backpack\AjacCrud successfully installed.");
    }
}
