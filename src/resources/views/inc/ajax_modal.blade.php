<!-- Modal for ajax crud -->
<div class="modal fade" id="modal-ajax-crud">
	<div class="modal-dialog">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Modal for ajax crud -->
<div class="modal fade" id="modal-ajax-field">
	<div class="modal-dialog">
		<div class="modal-content"></div>
	</div>
</div>

@push('after_scripts')
<script src="{{ asset('vendor/gaspertrix/laravel-backpack-ajax-crud/crud/js/ajax.js') }}"></script>
<script type="text/javascript">
    jQuery(document).ready(function($) {
    	$(document).on('show.bs.modal', '.modal', function (event) {
			modalInvoker = $(event.relatedTarget);
		});

		$(document).on('hidden.bs.modal', '.modal', function () {
		    var modalData = $(this).data('bs.modal');

		    if (modalData && modalData.options.remote) {
		        $(this).removeData('bs.modal');
		        $(this).find(".modal-content").empty();
		    }
		});
	});
</script>
@endpush