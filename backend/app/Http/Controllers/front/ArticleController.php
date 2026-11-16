<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //this methode will return all articles
    public function index() {
        $articles = Article::orderBy("created_at","desc")
        ->where('status',1)
        ->get();
    return response()->json([
        'status'=>true,
        'data'=>$articles
    ]);
    }

    //this methode will return latest articles
    public function latestArticles(request $request) {
        $articles = Article::orderBy("created_at","desc")
        ->where('status',1)
        ->limit($request->limit)
        ->get();
    return response()->json([
        'status'=>true,
        'data'=>$articles
    ]);
    }

    //this methode will return sigle artcile

    public function article($id) {
        $article = Article::find($id);
        if(!$article) {
            return response()->json([
                'status'=>false,
                'message'=>'Article not found'
            ]);
        }
    return response()->json([
        'status'=>true,
        'data'=>$article
    ]);
    }
}
