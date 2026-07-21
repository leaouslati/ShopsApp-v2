<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products=Product::latest()->get();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Product::class);
        $validated=$request->validate([
            'title'       => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $path=$request->file('image')->store('products','public');

        $product = Product::create([
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'price'       => $validated['price'],
            'image_path' => config('app.url') . '/storage/' . $path,
        ]);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $this->authorize('update',$product );
        $validated=$request->validate([
            'title'       => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if($request->hasFile('image')){
            $path=$request->file('image')->store('products','public');
            $validated['image_path']=config('app.url') . '/storage/' . $path;
        }
        unset($validated['image']);

        $product->update($validated);
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);
        $product->delete();
        return response()->json(['message'=>'Poduct deleted successfully']);
    }
}
