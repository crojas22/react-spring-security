package com.crojas.demo.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Main {

    @RequestMapping({"/", "/register"})
    public String getMain() {
        return "index";
    }

}
