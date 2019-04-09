/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';

/*
 * Local import
 */
import { getUsername } from 'src/utils/userUtils';

/*
 * Component
 */

class MessageFormat extends React.Component {
  static componentId = 0;
  getReplacementText = (regexObj, regexMatch, componentList) => {
    let replacementText = regexObj.replacement;
    // différentes conditions de remplacement
    if (replacementText === false) {
      replacementText = '';
    }
    else if (replacementText === '' && regexObj.symbol) {
      const replacementTextRegexp = new RegExp(`[${regexObj.symbol}]`, 'g');
      replacementText = regexMatch.replace(replacementTextRegexp, '');
    }
    else if (replacementText === 'sliced_part') {
      replacementText = regexMatch.slice(1, regexMatch.length - 1);
    }
    if (regexObj.name === 'username') {
      const { users } = this.props;
      let username = 'Anonymous';
      if (users) {
        users.forEach((user) => {
          if (user.id_slack === regexMatch.slice(2, -1)) {
            username = getUsername(user);
          }
        });
      }
      replacementText = username;
    }
    replacementText = this.transformStringToParts(replacementText, componentList);
    return replacementText;
  };
  getComponentProps = (regexObj, regexMatch) => {
    const propList = {};
    if (regexObj.props) {
      const props = Object.entries(regexObj.props);
      props.forEach((prop) => {
        let propValue = prop[1];
        if (propValue === 'sliced_part') {
          propValue = regexMatch.slice(1, -1);
        }
        else if (propValue === 'full_part') {
          propValue = regexMatch;
        }
        propList[prop[0]] = propValue;
      });
    }
    return propList;
  };
  transformStringToParts = (string, componentsList) => {
    let parts = [];
    if (!Array.isArray(string)) {
      parts = [string];
    }
    else {
      parts = string;
    }
    let match = true;
    if (componentsList.length === 0) {
      return parts;
    }
    while (match) {
      const newParts = [];
      let contentMatch = false;
      parts.forEach((part, partIndex) => {
        if (contentMatch) {
          newParts.push(part);
          return;
        }
        if (parts.length - 1 === partIndex && !contentMatch) {
          match = false;
        }
        if (typeof part === 'string' && !contentMatch) {
          componentsList.forEach((component) => {
            const stringMatchParts = part.match(component.hash);
            const stringSplitParts = part.split(component.hash);
            if (stringMatchParts && stringSplitParts.length > 1 && !contentMatch) {
              contentMatch = true;
              match = true;
              newParts.push(stringSplitParts[0]);
              newParts.push(component.component);
              newParts.push(stringSplitParts[1]);
            }
          });
        }
        if (contentMatch === false) {
          newParts.push(part);
        }
      });
      parts = newParts;
    }
    if (!Array.isArray(parts)) {
      return [parts];
    }
    return parts;
  };
  createHash = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  regexObjArray = [
    {
      expression: '[`]{3}(?:(?!```).)+[`]{3}',
      symbol: '```',
      type: 'block',
      flags: 'gs',
      name: 'tbq',
      component: 'div',
      replacement: '',
      props: {
        className: 'tbq',
      },
    },
    {
      expression: ':[a-zA-Z0-9_+:-]+:',
      type: 'inline',
      flags: 'g',
      name: 'emoji',
      component: Emoji,
      replacement: false,
      insideBlock: false,
      props: {
        size: 24,
        emoji: 'full_part',
      },
    },
    {
      expression: '<http[s]?:\\/\\/(?:(?!http[s]?:\\/\\/).)+>',
      type: 'inline',
      name: 'link',
      flags: 'g',
      component: 'a',
      replacement: 'sliced_part',
      insideBlock: true,
      props: {
        className: 'external-link',
        href: 'sliced_part',
      },
    },
    {
      expression: '`{1}[^`]+`{1}',
      flags: 'gs',
      symbol: '`',
      type: 'inline',
      name: 'code',
      component: 'span',
      replacement: 'sliced_part',
      insideBlock: false,
      props: {
        className: 'sbq',
      },
    },
    {
      expression: '[*]{1}[^*\\n]+[*]{1}',
      flags: 'g',
      type: 'inline',
      symbol: '*',
      name: 'bold',
      component: 'span',
      replacement: 'sliced_part',
      insideBlock: false,
      props: {
        className: 'bold',
      },
    },
    {
      expression: '_{1}[^_]+_{1}',
      flags: 'gs',
      type: 'inline',
      name: 'italic',
      symbol: '_',
      component: 'span',
      replacement: '',
      insideBlock: false,
      props: {
        className: 'italic',
      },
    },
    {
      expression: '<@[A-Z0-9]+>',
      flags: 'g',
      type: 'inline',
      name: 'username',
      component: 'span',
      replacement: 'users',
      insideBlock: false,
      props: {
        className: 'notify-user',
      },
    },
    {
      expression: '<!here>',
      flags: 'g',
      type: 'inline',
      name: 'here',
      component: 'span',
      replacement: '@channel',
      insideBlock: false,
      props: {
        className: 'notify-channel',
      },
    },
    {
      expression: '<!channel>',
      flags: 'g',
      type: 'inline',
      name: 'channel',
      component: 'span',
      replacement: '@channel',
      insideBlock: false,
      props: {
        className: 'notify-channel',
      },
    },
  ];
  htmlEntities = str => (
    str.replace(/&alt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  );
  /**
   * Crée le composant en fonction des différents paramètres
   */
  createComponent = (regexObj, regexMatch, replacementParts) => {
    const ComponentName = regexObj.component;
    // Vérifier si il n'y a pas d'autres match dans ce qui doit aller dans le composant
    replacementParts = this.formatMessage(replacementParts, true);
    // Récupération des props à passer au composant
    const propList = this.getComponentProps(regexObj, regexMatch);
    if (!Array.isArray(replacementParts)) {
      replacementParts = [replacementParts];
    }
    const replacement = (
      <ComponentName
        {...propList}
        key={MessageFormat.componentId}
      >
        {replacementParts.map(replacementPart => replacementPart)}
      </ComponentName>
    );
    MessageFormat.componentId += 1;
    return replacement;
  };
  transformPartsToString = (parts, componentList) => {
    if (!Array.isArray(parts)) {
      return [parts, componentList];
    }
    let currentString = '';
    parts.forEach((part) => {
      if (typeof part === 'string') {
        currentString += part;
      }
      else {
        const hash = this.createHash();
        const component = {
          component: part,
          hash,
        };
        componentList.push(component);
        currentString += hash;
      }
    });
    return [currentString, componentList];
  };
  formatMessage = (message, recursive = false) => {
    if (!message) {
      return [''];
    }
    let parts = [];
    if (typeof message === 'string') {
      parts = [this.htmlEntities(message)];
    }
    else {
      parts = message;
    }
    let componentList = [];
    this.regexObjArray.forEach((regexObj) => {
      const newParts = this.transformPartsToString(parts, componentList);
      const partToCheck = this.htmlEntities(newParts[0]);
      const newMatch = [];
      componentList = newParts[1];
      const regExp = new RegExp(regexObj.expression, regexObj.flags);

      const regexMatchParts = partToCheck.match(regExp);
      const regexSplitParts = partToCheck.split(regExp);

      if (regexMatchParts && regexSplitParts.length > 1) {
        if (recursive) {
          if (!regexObj.insideBlock) {
            return;
          }
        }
        newMatch.push(regexSplitParts[0]);
        regexMatchParts.forEach((matchedPart, matchedPartIndex) => {
          const nextPart = regexSplitParts[matchedPartIndex + 1];
          const replacementText = this.getReplacementText(regexObj, matchedPart, componentList);
          const component = this.createComponent(regexObj, matchedPart, replacementText);
          newMatch.push(component);
          if (nextPart) {
            newMatch.push(nextPart);
          }
        });
      }
      else {
        newMatch.push(partToCheck);
      }
      parts = newMatch;
    });
    const returnParts = this.transformStringToParts(parts, componentList);
    return returnParts;
  };
  render() {
    const { message } = this.props;
    const parts = this.formatMessage(message);
    return (
      <pre className="message-content">
        {parts.map(part => part)}
      </pre>
    );
  }
}
MessageFormat.propTypes = {
  message: PropTypes.string.isRequired,
  users: PropTypes.array,
};
MessageFormat.defaultProps = {
  users: [],
};

export default MessageFormat;
