import 'package:flutter/material.dart';

class Post {
  final String author;
  final DateTime timestamp;
  final String content;
  final int comments;
  final int retweets;
  final int likes;
  final PostTag tag;

  Post({
    required this.author,
    required this.timestamp,
    required this.content,
    required this.comments,
    required this.retweets,
    required this.likes,
    required this.tag,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      author: json['author'],
      timestamp: DateTime.parse(json['timestamp']),
      content: json['content'],
      comments: json['comments'],
      retweets: json['retweets'],
      likes: json['likes'],
      tag: PostTag.fromJson(json['tag']),
    );
  }
}

class PostTag {
  final String text;
  final Color color;
  final Color textColor;

  PostTag({required this.text, required this.color, required this.textColor});

  factory PostTag.fromJson(Map<String, dynamic> json) {
    return PostTag(
      text: json['text'],
      color: Color(int.parse(json['color'])),
      textColor: Color(int.parse(json['textColor'])),
    );
  }
}
