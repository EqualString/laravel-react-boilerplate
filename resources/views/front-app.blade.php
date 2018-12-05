<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Front</title>

        {{-- CSRF Token --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Bundled SASS/SCSS output --}}
        <link href="{{ mix('frontend/main.css') }}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="app-root" id="app">
            {{-- Node for react app to mount --}}
        </div>

        {{-- Very usefull polyfills cdn --}}
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

        {{-- Bundled js output --}}
        <script type="text/javascript" src="{{ mix('frontend/main.js') }}"></script>
    </body>
</html>
