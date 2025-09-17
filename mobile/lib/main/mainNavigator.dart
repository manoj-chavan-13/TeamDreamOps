import 'package:flutter/material.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class MainNavigator extends StatefulWidget {
  const MainNavigator(BuildContext context, {super.key});

  @override
  State<StatefulWidget> createState() => MainNavigatorState();
}

class MainNavigatorState extends State<StatefulWidget> {
  int selectedIndex = 0;

  static const List<Widget> _screen = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Text("Hey"),

      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.house),
            activeIcon: Icon(PhosphorIconsFill.house),
            label: "home",
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.file),
            activeIcon: Icon(PhosphorIconsFill.file),
            label: "report",
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.person),
            activeIcon: Icon(PhosphorIconsFill.person),
            label: "social",
          ),
          BottomNavigationBarItem(
            icon: Icon(PhosphorIconsRegular.user),
            activeIcon: Icon(PhosphorIconsFill.user),
            label: "user",
          ),
        ],
      ),
    );
  }
}
