import { Component } from 'solid-js';

const TopBar: Component = () => {
    return (
        <header class="top-bar">
            <nav class="top-menu">
                <a href="#projects" class="top-link" title="قيد التطوير">مشاريعنا</a>
                <a href="#track" class="top-link" title="قيد التطوير">المسار</a>
                <a href="#about" class="top-link" title="قيد التطوير">من نحن؟</a>
            </nav>
            <div class="top-actions">
                <a href="/discuss" class="btn btn-primary" title="للزبائن وحاملي المشاريع">ناقش فكرتك</a>
                <button class="btn btn-secondary" title="للطلاب والمتدربين الجدد - قيد التطوير">انضم للركب</button>
            </div>
        </header>
    );
};

export default TopBar;
