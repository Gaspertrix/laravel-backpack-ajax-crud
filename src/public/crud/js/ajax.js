$(document).on('submit', '#modal-ajax-crud form', function(event){
    event.preventDefault();

    $(this).ajaxSubmit({
        dataType: 'json',
        success: function(response, statusText, xhr, form) {
            if (xhr.status == 200 && !$.isEmptyObject(response))
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Created successfully',
                    type: 'success'
                });

                if (jQuery.isFunction($('#crudTable').dataTable))
                {
                    // TODO: Add/update item dynamically into list
                    crud.table.ajax.reload();
                }

                switch ($('#saveActions input[name="save_action"').val()) {
                    case 'save_and_new':
                    case 'save_and_edit':
                        $("#modal-ajax-crud .modal-content").load(response.redirect_url, function() {
                            $("#modal-ajax-crud").modal("show"); 
                        });
                        break;
                    case 'save_and_back':
                    default:
                        $("#modal-ajax-crud").modal("hide");
                        break;
                }
            }
            else
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Unknow error',
                    type: 'error'
                });
            }
        },
        error: function(xhr, statusText, error, form) {
            if (xhr.status == 422)
            {
                if (!$.isEmptyObject(xhr.responseJSON))
                {
                    if (!$.isEmptyObject(xhr.responseJSON.errors))
                    {
                        $("div.help-block").remove();

                        $.each(xhr.responseJSON.errors, function(property, messages) {
                            var normalizedProperty = property.split('.').map(function(item, index) {
                                    return index === 0 ? item : '['+item+']';
                                }).join('');

                            var field = form.find('[name="' + normalizedProperty + '[]"]').length ?
                                        form.find('[name="' + normalizedProperty + '[]"]') :
                                        form.find('[name="' + normalizedProperty + '"]'),
                                        container = field.parents('.form-group');

                            container.addClass('has-error');


                            $.each(messages, function(key, msg) {
                                // highlight the input that errored
                                var row = $('<div class="help-block">' + msg + '</div>');
                                row.appendTo(container);

                                // highlight its parent tab
                                var tab_id = $(container).parent().attr('id');
                                $("#form_tabs [aria-controls="+tab_id+"]").addClass('text-red');
                            });
                        });
                    }
                    else if (!$.isEmptyObject(xhr.responseJSON.message))
                    {
                        new PNotify({
                            text: xhr.responseJSON.message,
                            type: 'error'
                        });
                    }
                }
                else
                {
                    new PNotify({
                        text: error,
                        type: 'error'
                    });
                }
            }
            else
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Unknow error',
                    type: 'error'
                });
            }

            $('#saveActions button[type="submit"]').removeAttr("disabled");
        }
    }); 

    return false;
});

$(document).on('submit', '#modal-ajax-field form', function(event){
    event.preventDefault();

    $(this).ajaxSubmit({
        dataType: 'json',
        success: function(response, statusText, xhr, form) {
            if (xhr.status == 200 && !$.isEmptyObject(response))
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Created successfully',
                    type: 'success'
                });

                // Insert new item if it was added on the fly
                if (modalInvoker && modalInvoker.data('field'))
                {
                    var formInvoker = modalInvoker.closest('form');
                    var field = formInvoker.find('[name="' + modalInvoker.data('field') + '[]"]').length ?
                                formInvoker.find('[name="' + modalInvoker.data('field') + '[]"]') :
                                formInvoker.find('[name="' + modalInvoker.data('field') + '"]');

                    var attribute = modalInvoker.data('attribute');
                    var text = '';

                    // If there are not translatable fields
                    if (typeof response.data[attribute] == 'object')
                    {
                        // TODO: Read lang key from somewhere
                        text = response.data[attribute][Object.keys(response.data[attribute])[0]];
                    }
                    else {
                        text = response.data[attribute];
                    }

                    field.append($('<option>', {value: response.data[modalInvoker.data('key')], text: text}));
                }

                switch ($('#saveActions input[name="save_action"').val()) {
                    case 'save_and_new':
                    case 'save_and_edit':
                        $("#modal-ajax-field .modal-content").load(response.redirect_url, function() {
                            $("#modal-ajax-field").modal("show"); 
                        });
                        break;
                    case 'save_and_back':
                    default:
                        $("#modal-ajax-field").modal("hide");
                        break;
                }
            }
            else
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Unknow error',
                    type: 'error'
                });
            }
        },
        error: function(xhr, statusText, error, form) {
            if (xhr.status == 422)
            {
                if (!$.isEmptyObject(xhr.responseJSON))
                {
                    if (!$.isEmptyObject(xhr.responseJSON.errors))
                    {
                        $("div.help-block").remove();

                        $.each(xhr.responseJSON.errors, function(property, messages) {
                            var normalizedProperty = property.split('.').map(function(item, index) {
                                    return index === 0 ? item : '['+item+']';
                                }).join('');

                            var field = form.find('[name="' + normalizedProperty + '[]"]').length ?
                                        form.find('[name="' + normalizedProperty + '[]"]') :
                                        form.find('[name="' + normalizedProperty + '"]'),
                                        container = field.parents('.form-group');

                            container.addClass('has-error');


                            $.each(messages, function(key, msg) {
                                // highlight the input that errored
                                var row = $('<div class="help-block">' + msg + '</div>');
                                row.appendTo(container);

                                // highlight its parent tab
                                var tab_id = $(container).parent().attr('id');
                                $("#form_tabs [aria-controls="+tab_id+"]").addClass('text-red');
                            });
                        });
                    }
                    else if (!$.isEmptyObject(xhr.responseJSON.message))
                    {
                        new PNotify({
                            text: xhr.responseJSON.message,
                            type: 'error'
                        });
                    }
                }
                else
                {
                    new PNotify({
                        text: error,
                        type: 'error'
                    });
                }
            }
            else
            {
                new PNotify({
                    // TODO: Make translatable
                    text: 'Unknow error',
                    type: 'error'
                });
            }

            $('#saveActions button[type="submit"]').removeAttr("disabled");
        }
    }); 

    return false;
});