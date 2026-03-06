import React from 'react';
import {UsageRulesProps} from './types';
import './index.scss';

export const UsageRules: React.FC<UsageRulesProps> = ({rules, contactInfo}) => {
  return (
    <div className="usageRules">
      <div className="title">使用须知</div>
      <ul className="ruleList">
        {rules.map((rule, index) => (
          <li key={index} className="ruleItem">
            {index + 1}、{rule}
          </li>
        ))}
      </ul>
      {contactInfo && (
        <div className="contactInfo">
          如有疑问，可
          <span className="contactLink">{contactInfo}</span>
        </div>
      )}
    </div>
  );
};
