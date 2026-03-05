import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1>欢迎使用</h1>
        <p>Hello World - React Router 示例</p>
      </div>
      
      <div className="home-content">
        <div className="page-list">
          <h2>页面导航</h2>
          <Link to="/coupon-center" className="page-link">
            <div className="page-card">
              <div className="page-icon">🎫</div>
              <div className="page-info">
                <h3>领券中心</h3>
                <p>查看和领取优惠券</p>
              </div>
              <span className="arrow">›</span>
            </div>
          </Link>
          <Link to="/coupon-detail" className="page-link">
            <div className="page-card">
              <div className="page-icon">📋</div>
              <div className="page-info">
                <h3>优惠券详情</h3>
                <p>查看优惠券使用详情</p>
              </div>
              <span className="arrow">›</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
