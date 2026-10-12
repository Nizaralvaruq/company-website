<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    // this method will fetch all article
    public function index(){
        $articles = Article::orderBy("created_at","desc")->get();
        return response()->json([
            "status" => true,
            "data"=> $articles
        ]);

    }

    // this method will fetch sigle article
    public function show($id){
        $article = Article::find($id);

        if($article == null) {
        return response()->json([
            "status" => false,
            "message"=> "article not found"
        ]);
        }

        return response()->json([
            "status" => true,
            "data"=> $article
        ]);

    }

    // this methode will insert in DB
    public function store(Request $request){
        $request->merge(['slug' => Str::slug($request->slug)]);
        $validator = Validator::make ($request->all(), [
            "title"=> "required",
            "slug" => "required|unique:articles,slug"
            ]);
        if ($validator->fails()) {
            return response()->json([
                "status"=> false,
                "error"=> $validator->errors()
                ],);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->input('content');
        $article->save();

        //save Temp image here
    if ($request->imageId > 0) {
        $tempImage = TempImage::find($request->imageId);
        if ($tempImage != null){
            $extArray = explode('.',$tempImage->name);
            $ext = last($extArray);

            $fileName = strtotime('now').$article->id.'.'.$ext;

            //create small thumb image
            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/articles/small/'.$fileName);
            $manager = new ImageManager(Driver::class);
            $image = $manager->decode($sourcePath);
            $image->coverDown(450, 300);
            $image->save($destPath);

            //create large image
            $destPath = public_path('uploads/articles/large/'.$fileName);
            $manager = new ImageManager(Driver::class);
            $image = $manager->decode($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $article->image = $fileName;
            $article->save();
        }

    }
        return response()->json([
                "status"=> true,
                "message"=> 'Article added succesfuly'
                ],);
    }

    public function update(Request $request, $id){
        $article = Article::find($id);

        if ($article === null) {
        return response()->json([
            'status' => false,
            'message' => 'Articles not found',
        ], 404);
    }
    $request->merge(['slug' => Str::slug($request->slug)]);

    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'slug' => 'required|unique:articles,slug,'.$id.',id'
    ]) ;

    if ($validator->fails()) {
        return response()->json([
            'status'=> 'false',
            'errors' => $validator->errors()
        ]);
    }

        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->input('content');
        $article->save();

        //save Temp image here
    if ($request->imageId > 0) {
        $oldImage= $article->image;
        $tempImage = TempImage::find($request->imageId);
        if ($tempImage != null){
            $extArray = explode('.',$tempImage->name);
            $ext = last($extArray);

            $fileName = strtotime('now').$article->id.'.'.$ext;

            //create small thumb image
            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/articles/small/'.$fileName);
            $manager = new ImageManager(Driver::class);
            $image = $manager->decode($sourcePath);
            $image->coverDown(450, 300);
            $image->save($destPath);

            //create large image
            $destPath = public_path('uploads/articles/large/'.$fileName);
            $manager = new ImageManager(Driver::class);
            $image = $manager->decode($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $article->image = $fileName;
            $article->save();

            if ($oldImage != '') {
                File::delete(public_path('uploads/articles/small/'.$oldImage));
                File::delete(public_path('uploads/articles/large/'.$oldImage));
            }
        }

    }
        return response()->json([
                "status"=> true,
                "message"=> 'Article updated succesfuly'
                ],);
    }

    public function destroy($id) {
        $article = Article::find($id);

        if ($article == null) {
            return response ()->json([
                'status'=> false,
                'message'=> 'Article not found'
                ]);
        }

        File::delete(public_path('uploads/articles/small/'.$article->image));
        File::delete(public_path('uploads/articles/large/'.$article->image));

        $article->delete();


        return response()->json([
            'status'=> true,
            'message'=> 'delete article succesful'
            ]);
    }

}
