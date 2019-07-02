<?php

namespace Gaspertrix\Backpack\AjaxCrud;

use Illuminate\Support\ServiceProvider;

class AjaxCrudServiceProvider extends ServiceProvider
{
    protected $commands = [
        \Gaspertrix\Backpack\AjaxCrud\App\Console\Commands\Install::class,
    ];

    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands($this->commands);
        }

        // Load views
        $this->loadViewsFrom(realpath(__DIR__ . '/resources/views'), 'ajaxcrud');

        // Publish public assets
        $this->publishes([__DIR__ . '/public' => public_path('vendor/gaspertrix/laravel-backpack-ajax-crud')], 'public');
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
