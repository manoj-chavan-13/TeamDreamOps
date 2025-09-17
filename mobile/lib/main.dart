import 'package:mobile/pages/IncoisSplashScreen.dart';
import 'package:flutter/material.dart';

import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'connect',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'SF-Pro-Display',
        scaffoldBackgroundColor: const Color(0xFFF4F6F8),
      ),
      debugShowCheckedModeBanner: false,
      home: const IncoisSplashScreen(),
    );
  }
}
