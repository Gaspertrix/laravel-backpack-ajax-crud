<?php

namespace Gaspertrix\Backpack\AjaxCrud\Traits;

trait AjaxCrud
{
    /**
     * Check if AJAX is enabled for crud.
     *
     * @return bool
     */
    public function ajaxCrud()
    {
        return $this->crud->ajax_crud;
    }

    /**
     * Enable AJAX for crud functionality.
     */
    public function enableAjaxCrud()
    {
        $this->crud->setCreateContentClass('col-md-12');

        $this->crud->setListView('ajaxcrud::list');
        $this->crud->setCreateView('ajaxcrud::create');
        $this->crud->setEditView('ajaxcrud::edit');
        
        $this->crud->addButton('line', 'update', 'view', 'ajaxcrud::buttons.update', 'end');
        $this->crud->addButton('top', 'create', 'view', 'ajaxcrud::buttons.create');

        $this->crud->ajax_crud = true;
    }

    /**
     * Disable AJAX for crud functionality.
     */
    public function disableAjaxCrud()
    {
        $this->crud->ajax_crud = false;
    }
}
