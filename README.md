# HTML Email Builder

This Gulp setup is designed to streamline the creation of HTML emails.
It allows you to use SCSS for your styles and Pug for your HTML.
Included are some template modules for 1-3 columns as well as a single column with no gutters.
New modules are easy to add (explained further down).

*NOTE: all commands referenced in this README are assumed to be run from the repository root.*


## Installation

Simply run `yarn` to install the necessary dependencies.


## Usage

### Creating from a template

- Run `gulp create`
- When asked 'Which template do you want?' type the path of the relevant template within
`/src/_templates` (e.g. `example_group/example`)
- When asked 'What should the folder be called?' type the relevant path the new eDM should be
created at within `/src` (e.g. `<brand>/<category>/<email_name>`)


### Initialising development

Run `gulp`- This will start a local server on port 3030 with live reloading enabled,
and also starts the watch task.

If you simply wish to compile without initialising watch or the local server, run `gulp build`.


### Styles

Universal styles such as compatibility fixes and media queries to enable responsive behaviour
are included in SCSS partials in `/src/_assets/css` and are imported into the styles
for each job. There should be no need to touch these files- styles unrelated to resets/fixes
should be kept in the relevant directory for the email.

If you run `gulp --noInline`, CSS will not be inlined but will instead be embedded in a `<style>` tag.
The same applies to `gulp build --noInline`.

This has become much more viable since the end of September 2016, when Gmail finally rolled out
support for `<style>` tags, including media queries. It should be noted that there are some clients
that still require inline styles (perhaps most notably Gmail on Android with a Non Gmail Account,
a.k.a GANGA), so it's best to look at what is used by your target audience when deciding whether or
not to inline your styles. Also to consider is that some email clients enforce their own default styles.


### Markup

the `index.pug` file for each email should always begin with the following:

```
extends /_pug/__layout

block variables
	-
		$.subject = '<subject>'
		$.preheader = '<preheader text>'

block styles
	if noInline
		include:scss css/inline.scss
	include:scss css/_tag.scss

block body
```

Any additional/modified Pug variables can be set within the variables block, for example:

```
block variables
	-
		$.subject = '<subject>'
		$.preheader = '<preheader text>'
		$.bodyTableClasses = 'bg_black'
		$.w.total = 600

```

Any variables derived from others, even if only in their default state, should be set in the
derivative_variables block, for example:

```
block derivative_variables
	-
		$.img.spacer = 'http://example.com/spacer.gif'
		$.img.infoIcon = `${$.img.path}info_icon.gif`
```

The content of the email should all exist inside the body block, and is generally composed of
modules, for example:

```
block body
	+oneColumn({ containerClasses: 'txt_sml' })
		| &nbsp;
		br
		| Email not displaying correctly?
		|
		a(href='#') View web version
		br
		| &nbsp;
	+gutterless()
		a.no_underline(href='#')
			img.img_fix.img_fluid(
				alt='Title Image'
				src='https://satyr.io/1280x16:9/4053E5'
				width=$.w.total
			)
	+twoColumn({ containerClasses: 'bg_white' })
		+set('column1')
			| &nbsp;
			br
			| <column 1 content>
			br
			br
			| &nbsp;
		+set('column2')
			| &nbsp;
			br
			| <column 2 content>
			br
			br
			| &nbsp;
	+oneColumn({ containerClasses: 'txt_sml' })
		| &nbsp;
		br
		br
		| If you wish to stop receiving these emails, please
		|
		a(href='#') unsubscribe
		br
		br
		| &nbsp;
```
*NOTE: The use of `&nbsp;` and `<br>` in the above example is a way of managing vertical spacing
without relying on margin or padding, which can sometimes be unreliable in email.*

The included example template can also be viewed for further guidance.


### Width variables

As variables relating to the various widths of the layout are used in both the markup and styles,
it is important to ensure if those values are modified, they are kept consistent in both Pug and SCSS.


### Adding templates

To add a template, simply build as normal, then move the directory to the desired location in
`/src/_templates`.


### Adding modules

As stated earlier, new modules are easy to add if they are needed. Simply add the new module
as a Pug partial in `/src/_pug/modules`, then be sure to add the file to the list of includes
at the top of `/src/_pug/__layout.pug` (e.g. `include modules/<moduleName>`).

The actual module should be a mixin, and as the layout will insert instances inside a `<table>`,
the root element of the mixin should be a `<tr>`.

Options for modules should ideally be parameters of an `options` object within the mixin
(e.g. `options.containerClasses`).

If the module requires multiple content blocks, ensure the 'set' helper is included at the top of
the file (`include ../helpers/set`). Also ensure the helper is called for each block at the end of
the mixin, at its root level (e.g. `+set('column1')`).

For further guidance, the existing modules can be referred to as good examples.


## Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.


## License

[ISC](https://choosealicense.com/licenses/isc/)
