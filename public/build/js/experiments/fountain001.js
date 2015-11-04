(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var parser = require('./src/parser');

module.exports = parser;
},{"./src/parser":2}],2:[function(require,module,exports){
var sections = require('./sections'),
    tokenizer = require('./tokenizer');


var parser = {
  parse: function (script, _options, callback) {
    if (callback === undefined && typeof _options === 'function') {
      callback = _options;
      _options = {};
    } else if (_options === undefined) {
      _options = {};
    }
    
    // Default options
    var options = {
      tokens: _options['tokens'] || false
    };
      
    var tokens = tokenizer.tokenize(script), 
        i = tokens.length, 
        token,
        title_page_html = [], 
        script_html = [];
    
    var output = { 
      title: '',
      credit: '',
      authors: [],
      source: '',
      notes: '',
      draft_date: '',
      date: '',
      contact: '',
      copyright: '',
      
      scenes: [],
      
      title_page_html: '',
      script_html: ''
    };

    for (var j in tokens) {
      token = tokens[j];
      token.text = parser.lexer(token.text);

      switch (token.type) {
        case 'title': 
          title_page_html.push('<h1>' + token.text + '</h1>'); 
          output.title = token.text.replace('<br />', ' ').replace(/<(?:.|\n)*?>/g, ''); 
          break;
        case 'credit': 
          title_page_html.push('<p class="credit">' + token.text + '</p>'); 
          output.credit = token.text;
          break;
        case 'author': 
          title_page_html.push('<p class="authors">' + token.text + '</p>');
          output.authors.push(token.text)
          break;
        case 'authors': 
          title_page_html.push('<p class="authors">' + token.text + '</p>'); 
          output.authors = output.authors.concat(token.text.replace('<br />', "\n").replace(', ', ',').split(/[\n,]/));
          break;
        case 'source': 
          title_page_html.push('<p class="source">' + token.text + '</p>'); 
          output.source = (token.text);
          break;
        case 'notes': 
          title_page_html.push('<p class="notes">' + token.text + '</p>'); 
          output.notes = token.text;
          break;
        case 'draft_date': 
          title_page_html.push('<p class="draft-date">' + token.text + '</p>'); 
          output.draft_date = token.text;
          break;
        case 'date': 
          title_page_html.push('<p class="date">' + token.text + '</p>'); 
          output.date = token.text;
          break;
        case 'contact': 
          title_page_html.push('<p class="contact">' + token.text + '</p>'); 
          output.contact = token.text;
          break;
        case 'copyright': 
          title_page_html.push('<p class="copyright">' + token.text + '</p>'); 
          output.copyright = token.text;
          break;

        case 'scene_heading': 
          script_html.push('<h2' + (token.scene_number ? ' id=\"' + token.scene_number + '\">' : '>') + token.text + '</h2>'); 
          output.scenes.push(token.text);
          break;
        case 'transition': 
          script_html.push('<p class="transition">' + token.text + '</p>');
          break;

        case 'dual_dialogue_begin': 
          script_html.push('<div class="dual-dialogue">'); 
          break;
        case 'dialogue_begin': 
          script_html.push('<div class="dialogue' + (token.dual ? ' ' + token.dual : '') + '">'); 
          break;
        case 'character': 
          script_html.push('<h4>' + token.text.replace(/^@/, '') + '</h4>'); 
          break;
        case 'parenthetical': 
          script_html.push('<p class="parenthetical">' + token.text + '</p>'); 
          break;
        case 'dialogue': 
          script_html.push('<p>' + token.text + '</p>'); 
          break;
        case 'dialogue_end': 
          script_html.push('</div>'); 
          break;
        case 'dual_dialogue_end': 
          script_html.push('</div>'); 
          break;

        case 'section': 
          script_html.push('<p class="section" data-depth="' + token.depth + '">' + token.text + '</p>'); 
          break;
        case 'synopsis': 
          script_html.push('<p class="synopsis">' + token.text + '</p>'); 
          break;

        case 'note': 
          script_html.push('<!-- ' + token.text + ' -->'); 
          break;
        case 'boneyard_begin':
          script_html.push('<!-- ');
          break;
        case 'boneyard_end': 
          script_html.push(' -->'); 
          break;
        
        case 'lyrics':
          script_html.push('<p class="lyrics">' + token.text + '</p>');
          break;
        case 'action': 
          script_html.push('<p>' + token.text + '</p>'); 
          break;
        case 'centered': 
          script_html.push('<p class="centered">' + token.text + '</p>'); 
          break;
        
        case 'page_break': 
          script_html.push('<hr />'); 
          break;
        case 'line_break': 
          script_html.push('<br />'); 
          break;
      }
    }

    output.title_page_html = title_page_html.join('');
    output.script_html = script_html.join('');
    
    if (options.tokens) {
      output.tokens = tokens;
    };

    if (typeof callback === 'function') {
      return callback(output);
    }

    return output;
  },
  
  
  


  lexer: function (s) {
    if (!s) {
      return;
    }  
    
    var inline = {
      note: '<!-- $1 -->',
      line_break: '<br />',
      bold_italic_underline: '<strong><em><span style="text-decoration:underline">$2</span></em></strong>',
      bold_underline: '<strong><span style="text-decoration:underline">$2</span></strong>',
      italic_underline: '<em><span style="text-decoration:underline">$1</span></em>',
      bold_italic: '<strong><em>$2</em></strong>',
      bold: '<strong>$2</strong>',
      italic: '<em>$2</em>',
      underline: '<span style="text-decoration:underline">$2</span>'
    };

    var styles = ['bold_italic_underline', 'bold_underline', 'italic_underline', 'bold_italic', 'bold', 'italic', 'underline'],
        style, 
        match;

    s = s.replace(sections.note_inline, inline.note).replace(/\\\*/g, '[star]').replace(/\\_/g, '[underline]').replace(/\n/g, inline.line_break);

    for (var i in styles) {
      style = styles[i];
      match = sections[style];
 
      if (match.test(s)) {
        s = s.replace(match, inline[style]);
      }
    }

    return s.replace(/\[star\]/g, '*').replace(/\[underline\]/g, '_').trim();
  }
  
};


module.exports = parser;
},{"./sections":3,"./tokenizer":4}],3:[function(require,module,exports){
module.exports = {
  title_page: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,
  
  scene_heading: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
  scene_number: /( *#(.+)# *)/,

  transition: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/,
  
  dialogue: /^(\@?[A-Za-z*_]+[0-9A-Z (._\-')]*)(\^?)?(?:\n(?!\n+))([\s\S]+)/,
  parenthetical: /^(\(.+\))$/,
  lyrics: /^~(.+)/g,
  action: /^(.+)/g,
  centered: /^(?:> *)(.+)(?: *<)(\n.+)*/g,
      
  section: /^(#+)(?: *)(.*)/,
  synopsis: /^(?:\=(?!\=+) *)(.*)/,

  note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
  note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
  boneyard: /(^\/\*|^\*\/)$/g,

  page_break: /^\={3,}$/,
  line_break: /^ {2}$/,

  emphasis: /(_|\*{1,3}|_\*{1,3}|\*{1,3}_)(.+)(_|\*{1,3}|_\*{1,3}|\*{1,3}_)/g,
  bold_italic_underline: /(_{1}\*{3}(?=.+\*{3}_{1})|\*{3}_{1}(?=.+_{1}\*{3}))(.+?)(\*{3}_{1}|_{1}\*{3})/g,
  bold_underline: /(_{1}\*{2}(?=.+\*{2}_{1})|\*{2}_{1}(?=.+_{1}\*{2}))(.+?)(\*{2}_{1}|_{1}\*{2})/g,
  italic_underline: /(?:_{1}\*{1}(?=.+\*{1}_{1})|\*{1}_{1}(?=.+_{1}\*{1}))(.+?)(\*{1}_{1}|_{1}\*{1})/g,
  bold_italic: /(\*{3}(?=.+\*{3}))(.+?)(\*{3})/g,
  bold: /(\*{2}(?=.+\*{2}))(.+?)(\*{2})/g,
  italic: /(\*{1}(?=.+\*{1}))(.+?)(\*{1})/g,
  underline: /(_{1}(?=.+_{1}))(.+?)(_{1})/g,

  splitter: /\n{2,}/g,
  cleaner: /^\n+|\n+$/,
  standardizer: /\r\n|\r/g,
  whitespacer: /^\t+|^ {3,}/gm
};
},{}],4:[function(require,module,exports){
var sections = require('./sections');


var tokenizer = {
  
  clean: function (script) {
    return script.replace(sections.boneyard, '\n$1\n').replace(sections.standardizer, '\n').replace(sections.cleaner, '').replace(sections.whitespacer, '');
  },


  tokenize: function (script) {
    var script_lines = tokenizer.clean(script).split(sections.splitter),
        line, 
        match, 
        parts, 
        text, 
        meta, 
        i,
        x, 
        length, 
        dual, 
        tokens = [];

    for (i in script_lines) {
      line = script_lines[i];
      
      // title page
      if (sections.title_page.test(line)) {
        match = line.replace(sections.title_page, '\n$1').split(sections.splitter);
        for (x = 0, length = match.length; x < length; x++) {
          parts = match[x].replace(sections.cleaner, '').split(/\:\n*/);
          tokens.push({ type: parts[0].trim().toLowerCase().replace(' ', '_'), text: parts[1].trim() });
        }
        continue;
      }

      // scene headings
      if (match = line.match(sections.scene_heading)) {
        text = match[1] || match[2];

        if (text.indexOf('  ') !== text.length - 2) {
          if (meta = text.match(sections.scene_number)) {
            meta = meta[2];
            text = text.replace(sections.scene_number, '');
          }
          tokens.push({ type: 'scene_heading', text: text, scene_number: meta || undefined });
        }
        continue;
      }

      // centered
      if (match = line.match(sections.centered)) {
        tokens.push({ type: 'centered', text: match[0].replace(/>|</g, '') });
        continue;
      }

      // transitions
      if (match = line.match(sections.transition)) {
        tokens.push({ type: 'transition', text: match[1] || match[2] });
        continue;
      }
    
      // dialogue blocks - characters, parentheticals and dialogue
      if (match = line.match(sections.dialogue)) {
        if (match[1].indexOf('  ') !== match[1].length - 2) {
          parts = match[3].split(/(\(.+\))(?:\n+)/).reverse();

          dual_diaglogue = !!match[2];

          if (dual_diaglogue) {
            tokens.push({ type: 'dual_dialogue_begin' });
          }

          tokens.push({ type: 'dialogue_begin', dual: dual_diaglogue ? 'right' : dual ? 'left' : undefined });
          tokens.push({ type: 'character', text: match[1].trim() });
  
          for (x = 0, length = parts.length; x < length; x++) {	
            text = parts[x].trim();

            if (text.length > 0) {
              tokens.push({ type: sections.parenthetical.test(text) ? 'parenthetical' : 'dialogue', text: text });
            }
          }
          
          tokens.push({ type: 'dialogue_end' });
          
          if (dual_diaglogue) {
            tokens.push({ type: 'dual_dialogue_end' });
          }
          continue;
        }
      }
      
      // section
      if (match = line.match(sections.section)) {
        tokens.push({ type: 'section', text: match[2], depth: match[1].length });
        continue;
      }
      
      // synopsis
      if (match = line.match(sections.synopsis)) {
        tokens.push({ type: 'synopsis', text: match[1] });
        continue;
      }

      // notes
      if (match = line.match(sections.note)) {
        tokens.push({ type: 'note', text: match[1]});
        continue;
      }      

      // boneyard
      if (match = line.match(sections.boneyard)) {
        tokens.push({ type: match[0][0] === '/' ? 'boneyard_begin' : 'boneyard_end' });
        continue;
      }      

      // page breaks
      if (sections.page_break.test(line)) {
        tokens.push({ type: 'page_break' });
        continue;
      }
      
      // line breaks
      if (sections.line_break.test(line)) {
        tokens.push({ type: 'line_break' });
        continue;
      }
      
      // lyrics
      if (sections.lyrics.test(line)) {
        tokens.push({ type: 'lyrics', text: line });
        continue;
      }

      tokens.push({ type: 'action', text: line });
    }

    return tokens;
  }
  
};

module.exports = tokenizer;
},{"./sections":3}],5:[function(require,module,exports){
"use strict";

var fountain = require('fountain-js');

var preview = fountain.parse(config.example);
console.log(preview);

$(window).ready(function(){
    $('#preview').html(preview.script_html);
});
},{"fountain-js":1}]},{},[5]);
