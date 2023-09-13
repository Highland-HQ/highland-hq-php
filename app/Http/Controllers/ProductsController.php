<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    // $products = Product::select(
    //   'id',
    //   'name',
    //   'thumbnail_image_url',
    //   'SKU',
    //   'quantity',
    //   'price',
    //   'status'
    // )->get();

    $products = Product::all();

    return Inertia::render('Dashboard/Products/Index', [
      'products' => $products,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return view('dashboard.products.create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
