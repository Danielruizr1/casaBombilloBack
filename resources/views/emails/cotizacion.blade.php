<table style="border-collapse: collapse;">
	<thead>
		<tr style="background-color:#649FF0;color:#fff;">
			@foreach ($data['data']['columns'] as $column)
				<th style="padding:5px 10px;">
					{{$column}}					
				</th>
			@endforeach
		</tr>
	</thead>
	<tbody>
		@foreach ($data['data']['items'] as $item)
			<tr style="border-bottom:1px solid grey; padding:3px;">
				<td style="padding:5px 10px;">
					{{$item['nombre']}}
				</td>
				<td style="padding:5px 10px;">
					{{$item['precio']}}
				</td>
				<td style="padding:5px 10px;">
					{{$item['cantidad']}}
				</td>
			</tr>

		@endforeach
		<tr>
			<td style="font-weight:800;">
				TOTAL: {{$data['data']['total']}}
			</td>
		</tr>		
	</tbody>
</table>