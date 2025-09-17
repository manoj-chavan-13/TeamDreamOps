import '../model/report_model.dart';
import 'dart:convert';
import '../model/post_model.dart';

class ApiService {
  static Future<List<Report>> fetchReports() async {
    await Future.delayed(const Duration(milliseconds: 1500));
    return [
      Report(
        title: "High Waves",
        timestamp: DateTime(2025, 9, 14, 16, 15),
        status: "Verified",
      ),
      Report(
        title: "Flooding",
        timestamp: DateTime(2025, 9, 14, 11, 30),
        status: "In Review",
      ),
    ];
  }

  static Future<List<Report>> fetchEmptyReports() async {
    await Future.delayed(const Duration(milliseconds: 1500));
    return [];
  }

  static Future<List<Report>> fetchReportsWithError() async {
    await Future.delayed(const Duration(milliseconds: 1500));

    throw Exception(
      'Failed to connect to the server. Please check your connection.',
    );
  }

  final String _apiUrl = "https://api.mocki.io/v2/a6385981/social-posts";

  Future<List<Post>> fetchPosts() async {
    await Future.delayed(const Duration(seconds: 1));

    const String mockResponse = '''
    [
      {
        "author": "@CoastalWatcher",
        "timestamp": "2025-09-16T18:35:14Z",
        "content": "Massive waves crashing over the sea wall here in #Mumbai. Never seen it this bad. #cyclone #highwaves",
        "comments": 12,
        "retweets": 45,
        "likes": 102,
        "tag": {
          "text": "Panicked",
          "color": "0xFFFBE9E7",
          "textColor": "0xFFD32F2F"
        }
      },
      {
        "author": "Local News Channel",
        "timestamp": "2025-09-16T16:40:14Z",
        "content": "Authorities have issued a warning for coastal areas due to potential swell surge. Please stay away from the beaches.",
        "comments": 0,
        "retweets": 87,
        "likes": 553,
        "tag": {
          "text": "Informative",
          "color": "0xFFE3F2FD",
          "textColor": "0xFF1976D2"
        }
      },
      {
        "author": "WeatherGeek",
        "timestamp": "2025-09-16T13:40:00Z",
        "content": "The cyclone is expected to make landfall tomorrow morning. Wind speeds could reach up to 120 km/h. Stay safe everyone!",
        "comments": 58,
        "retweets": 112,
        "likes": 305,
        "tag": {
          "text": "Warning",
          "color": "0xFFFFF3E0",
          "textColor": "0xFFF57C00"
        }
      }
    ]
    ''';

    final List<dynamic> body = json.decode(mockResponse);
    final List<Post> posts = body
        .map((dynamic item) => Post.fromJson(item))
        .toList();

    return posts;
  }
}












// Future<List<Post>> fetchPosts() async {
    
//     final response = await http.get(Uri.parse(_apiUrl));


//     if (response.statusCode == 200) {

//       final List<dynamic> body = json.decode(response.body);
//       final List<Post> posts = body
//           .map((dynamic item) => Post.fromJson(item))
//           .toList();
//       return posts;
//     } else {
   
//       throw Exception('Failed to load posts from API');
//     }