import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function RecipeSEO({ data, image, name, keywords, date, description }) {
  const getInstructions = instructions => {
    let allInstructions = [];
    instructions.forEach(inst => {
      allInstructions.push([
        `{
                "@type": "HowToStep",
                "text": "${inst}"
            }`
      ]);
    });
    return allInstructions;
  };

  const getIngredients = ingredients => {
    let allIngredients = [];
    ingredients.forEach(section => {
      section.data.forEach(ing => {
        allIngredients = allIngredients.concat(ing.text);
      });
    });

    allIngredients = allIngredients.map(ing => {
      return `"${ing}"`;
    });

    return allIngredients;
  };

  const imagesrc = image?.images?.fallback?.src;
  console.log(imagesrc);

  return (
    <StaticQuery
      query={detailsQuery}
      render={d => {
        return (
          <Helmet>
            <script type="application/ld+json">{`{
                        "@context": "https://schema.org/",
                        "@type": "Recipe",
                        "name": "${name}",
                        "author": {
                            "@type": "Person",
                            "name": "Tara Siegel"
                        },
                        "image": "https://www.fullstackkitchen.com${imagesrc}",
                        "datePublished": "${date}",
                        "description": "${description}",
                        "prepTime": "PT${data.prepTime}M",
                        "cookTime": "PT${data.cookTime}M",
                        "totalTime": "PT${data.totalTime}M",
                        "keywords": "${keywords}",
                        "recipeYield": "${data.yield}",
                        "recipeCategory": "Dessert",
                        "recipeCuisine": "Dessert",
                        "recipeIngredient": [${getIngredients(data.ingredients)}],
                        "recipeInstructions": [${getInstructions(data.instructions)}],
                        "aggregateRating": null,
                        "video": null,
                        "nutrition": {
                          "@type": "NutritionInformation",
                          "calories": "${data.calories} calories"
                        },
                    }`}</script>
          </Helmet>
        );
      }}
    />
  );
}

RecipeSEO.defaultProps = {
  data: {
    subTitle: '',
    yield: '',
    prepTime: '0',
    cookTime: '0',
    totalTime: '0',
    ingredients: [],
    instructions: [],
    assembly: []
  }
};

RecipeSEO.propTypes = {
  data: PropTypes.object
};

export default RecipeSEO;

const detailsQuery = graphql`
  query RecipeSEOQuery {
    site {
      siteMetadata {
        title
        description
        author {
          name
        }
      }
    }
  }
`;
