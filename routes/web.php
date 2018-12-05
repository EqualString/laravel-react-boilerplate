<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Web routes are used only for serving html content via blade
 * React router will handle everything else on browser
 * Also be careful with rules on routes!!
 * 
 * Like this, front app will be served on everything except "/admin"
 * While /admin will be served on anything with that prefix
 * But be carefull, /admin won't serve anything
 * Also take care for basename route on admin router!
 */

Route::get('/{any}', function () {
    return view('front-app');
})->where('any', '^(?!admin).*$')->name('react-front');

Route::get('admin/{any}', function () {
    return view('admin-app');
})->where('any', '.*')->name('react-admin');
