import React from 'react';
import {UsageRulesProps} from './types';
import './index.scss';

export const UsageRules: React.FC<UsageRulesProps> = ({rules, contactInfo}) => {
  return (
    <div className="usage-rules">
      <div className="title">使用须知</div>
      <ul className="rule-list">
        {rules.map((rule, index) => (
          <li key={index} className="rule-item">
            {index + 1}、{rule}
          </li>
        ))}
      </ul>
      {contactInfo && (
        <div className="contact-info">
          如有疑问，可
          <span className="contact-link">{contactInfo}</span>
        </div>
      )}
    </div>
  );
};
