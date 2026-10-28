<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;

class MemberController extends Controller
{
    //this methode will return all the members from the database
    public function index() {

        $members = Member::orderBy("created_at","DESC")->get();
        return response()->json([
            'status'=> true,
            'data'=> $members,
            'message'=> 'Members retrieved successfully'
            ]);
    }

    //this methpode will store a new member in the database
    public function store(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=> 'false',
                'errors' => $validator->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->image = $request->image;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->save();

        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null){
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id.'.'.$ext;

                //create small thumb image
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json([
            'status'=> true,
            'message'=> 'Member added successfuly'
            ]);
}

    //this methode will return sigle member from the database
    public function show($id) {
        $member = Member::find($id);

        if ($member == null) {
            return response()->json([
                'status'=> false,
                'message'=> 'Member not found'
                ]);
        }

        return response()->json([
            'status'=> true,
            'data'=> $member,
            'message'=> 'Members retrieved successfully'
            ]);

}
    //this methode will update a member in the database
    public function update(Request $request, $id) {

    $member = Member::find($id);

    if ($member == null) {
            return response()->json([
                'status'=> false,
                'message'=> 'Member not found'
                ]);
        }

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=> 'false',
                'errors' => $validator->errors()
            ]);
        }

        if (!$member) {
            return response()->json([
                'status'=> false,
                'message'=> 'Member not found'
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null){
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id.'.'.$ext;

                //create small thumb image
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();

                if ($oldImage != '') {
                File::delete(public_path('uploads/members/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status'=> true,
            'message'=> 'Member updated successfully'
            ]);

}
    //this methode will delete a member from the database
    public function destroy($id) {
        $member = Member::find($id);

        if ($member == null) {
            return response()->json([
                'status'=> false,
                'message'=> 'Member not found'
                ]);
        }

        $oldImage = $member->image;
        $member->delete();

        if ($oldImage != '') {
            File::delete(public_path('uploads/members/'.$oldImage));
        }

        return response()->json([
            'status'=> true,
            'message'=> 'Member deleted successfully'
            ]);
    }
}
