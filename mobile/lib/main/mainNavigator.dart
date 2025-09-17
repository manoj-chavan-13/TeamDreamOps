import 'package:flutter/material.dart';

class MainNavigator extends StatefulWidget {
  const MainNavigator(BuildContext context, {super.key});

  @override
  State<StatefulWidget> createState() => MainNavigatorState();
}

class MainNavigatorState extends State<StatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(body: Text("Hey"));
  }
}
