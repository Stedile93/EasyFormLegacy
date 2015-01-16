# EasyForm

EasyForm provides a easier way to create contact forms.


## Installation

#### Step 1: Required files

First, you must include jQuery, becouse the plugin is based on it. After that, we must include CSS and JS from Bootstrap v3.3.1. And finally, include the plugin EasyForm.

```html
<!-- jQuery -->
<script type="text/javascript" src="jquery-1.11.2.min.js"></script>

<!-- Bootstrap JS and CSS -->
<script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css">

<!-- EasyForm JS and CSS -->
<script type="text/javascript" src="jquery.easyform.js"></script>
<link rel="stylesheet" type="text/css" href="easyform.css">
```

#### Step 2: Set element that will get the plugin

```html
...

<body>
  <div id="myForm"></div>
</body>

...
```

#### Step 3: Configuration

```html
...

<body>
  ...
  
  <script type="text/javascript">
		$(document).ready(function(){
			$('#myForm').easyform({
				token      : '62bb61431348e22850828a5829c4373faafe29c1',
				secret     : '51a266c2844ccd5cac83d88de88d82d05358aa51',
				title      : 'Form',
				fields : {
					estado : ['PR', 'SC', 'RS'],
					nivel  : ['Beginner', 'Intermediate', 'Advanced', 'Ninja']
				},
				lang : 'en',
				modal      : true,
				nameButtonModal : 'I want to receive materials by email'
			});
		});
	</script>
</body>

...
```

### Configuration options

#### General

**token**
Token Hash for HTTP Request
```
default: ''
options: string
```

**secret**
Secret Hash for HTTP Request
```
default: ''
options: string
```

**urlRequest**
URL that will get the data of the form
```
default: ''
options: string
```

**title**
Title of form
```
default: 'Form'
options: string
```

**fields.estado**
Determines the select options. Ex.: ['PR', 'SC', 'RS']
```
default: ''
options: array
```

**fields.nivel**
Determines the select options. Ex.: ['Beginner', 'Intermediate', 'Advanced', 'Ninja']
```
default: ''
options: array
```

**lang**
Determines the lang of plugin
```
default: pt
options: pt, en
```

**modal**
Determines if the form is on page ou in modal
```
default: false
options: boolean (true / false)
```

**nameButtonModal**
Determines the name of modal button
```
default: 'Press to open form'
options: string
```


Thanks for read!
