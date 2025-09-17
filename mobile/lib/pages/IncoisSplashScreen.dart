import 'dart:async';
import 'package:mobile/main/MainNavigator.dart';
import 'package:mobile/pages/auth/loginScreen.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class IncoisSplashScreen extends StatefulWidget {
  const IncoisSplashScreen({super.key});

  @override
  State<IncoisSplashScreen> createState() => _IncoisSplashScreenState();
}

class _IncoisSplashScreenState extends State<IncoisSplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  _checkLoginStatus() async {
    await Future.delayed(const Duration(milliseconds: 3000));

    final SharedPreferences prefs = await SharedPreferences.getInstance();

    final bool isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

    if (!mounted) return;

    if (isLoggedIn) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const MainNavigator()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryColor = Color(0xFF1E607E);

    return const Scaffold(
      backgroundColor: primaryColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(Icons.waves, color: Colors.white, size: 80.0),
            SizedBox(height: 24.0),
            Text(
              'INCOIS',
              style: TextStyle(
                color: Colors.white,
                fontSize: 52.0,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
            SizedBox(height: 8.0),
            Text(
              'Your Eyes on the Coast',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16.0,
                fontWeight: FontWeight.normal,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
