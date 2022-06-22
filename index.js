
const fs = require('fs')

module.exports = (opts = {}) =>
{
	return {
		postcssPlugin: 'postcss-push',

		Once(styles, { result })
		{
			(opts.prepend || []).forEach(a =>
			{
				result.messages.push(
					{
						type: "dependency",
						plugin: "postcss-push",
						file: a,
						parent: '__' + a,
					})

				styles.prepend(fs.readFileSync(a)+"\n\n")
			});

			(opts.append || []).forEach(a =>
			{
				result.messages.push(
					{
						type: "dependency",
						plugin: "postcss-push",
						file: a,
						parent: '__' + a,
					})

				styles.append("\n\n"+fs.readFileSync(a))
			})
		}
	}
}

module.exports.postcss = true
