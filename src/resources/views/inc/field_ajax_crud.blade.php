@if (isset($field['ajax_crud']) && isset($field['ajax_crud']['route']))
<a href="/{{ $field['ajax_crud']['route'] }}/create" data-toggle="modal" data-target="#modal-ajax-field" data-field="{{ $field['name'] }}" data-key="{{ (new $field['model'])->getKeyName() }}" data-attribute="{{ $field['attribute'] }}">
	<i class="fa fa-plus-circle pull-right" style="margin-top: 3px;" title="Add a new {{ $field['ajax_crud']['name'] }}"></i>
</a>
@endif