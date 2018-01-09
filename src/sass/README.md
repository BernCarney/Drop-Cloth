# ITCSS Project Architecture

This will serve as an outline for the methodology that I've chosen for this project, and hopefully future projects. When looking at the initial file structure (outlined below), it may seem a little overwhelming and difficult to grasp. It also looks overly granular when first reviewing the partial structure, however, after using the ITCSS methodology, it makes a lot of sense. In short, the thought process is that the project structure is designed with specificity in mind, in an inverse triangle shape, with the most generic rules being at the top, and the most granular at the bottom. This results in cleaner and more efficient compiled CSS as well as a better knowledge of what can be changed without breaking things and what should be examined carefully. Below is the structure with the most generic partials located at the top (imported first) and the most specific partials at the bottom (imported last).

## Settings

Global variables such as *colors*, *base font size*, *base line height*, and other site-wide settings that other partials required. The settings section and tools sections are completely optional. If you are not using a preprocessor, you can remove the settings and tools sections.

## Tools

These include SASS mixins and functions that make building styles **1)** easier and quicker, and **2)** more consistent across the entirety of the site. There shouldn't be any classes written yet.

## Generic

These are rulesets that are low specificity and far reaching such as *normalize.css*, and CSS resets.

## Elements

Yay, we're finally styling the page with defaults that we had planned. These are element styles  with no classes or IDs (e.g. `code {}`, `p {}`, `section {}`).

## Objects

*Object classes are preceded by an `o-`*

This is another optional layer if you write your CSS in more of an object-oriented fashion. These are layouts and repeated design patterns with no cosmetic styling (e.g. `.o-card {}`, `.o-hero {}`, `.o-grid {}`). This is the layer that creates the structure of our site but is very boring in appearance.

## Components

*Component classes are preceded by a `c-`*

This is the meat and potatoes of the architecture where you make it your own. This are cosmetic rules that make the objects we defined in the layer above, look pretty. Each partial should be a complete component (e.g. `.c-navbar {}`, `.c-menu {}`, `.c-form`).

## Utilities

*Utility classes are preceded by a `u-`*

These are highly specific rules that include overrides and helper classes. This is the only place in your CSS where !important can, and should, be used (e.g. `.u-pull-right {}`, `.u-hidden {}`, `.u-no-padding {}`). These are the rules that should only be used in special cases. If you find yourself using them quite often, you should rethink the structure of you object or component to include that rule.