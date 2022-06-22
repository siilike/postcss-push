const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = {})
{
	let result = await postcss([plugin(opts)]).process(input, { from: undefined })
	expect(result.css).toEqual(output)
	expect(result.warnings()).toHaveLength(0)
}

it('works', async () =>
{
	await run('#b { font-size: 25px; }', `#a { font-size: 20px; }\n#b { font-size: 25px; }\n#c { font-size: 30px; }`,
	{
		append:
		[
			'test-append.css',
		],
		prepend:
		[
			'test-prepend.css',
		]
	})
})
