const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-toc');
const util = require('util');
const inspect = require("util").inspect;
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Add debug console
    eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);
    // Add console
    eleventyConfig.addFilter('console', function(value) {
        const str = util.inspect(value);
        console.log(str);
    });
    eleventyConfig.addPlugin(pluginTOC, {
        'tags': ['h2', 'h3'],
    });
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setLibrary(
        'md',
        markdownIt({
            html: true,
        }).use(markdownItAnchor)
    )

    eleventyConfig.addPassthroughCopy('./src/assets/');
    eleventyConfig.addPassthroughCopy({
        './node_modules/prismjs/themes/prism.css': '/assets/css/prism.css',
    });

    eleventyConfig.addCollection("keynoteSlides", function(collectionApi) {
        const content = collectionApi.getAll().filter(item => {
            return item.data.tags ? item.data.tags.includes('slides') : false;
        }).sort((a, b) => {
            if (a.data.page.filePathStem > b.data.page.filePathStem) {
                return 1;
            } else if (a.data.page.filePathStem < b.data.page.filePathStem) {
                return -1;
            }

            return 0;
        });

        content.forEach(item => {
            console.log(item.data.title);
        });

        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'public',
        }
    }
}
