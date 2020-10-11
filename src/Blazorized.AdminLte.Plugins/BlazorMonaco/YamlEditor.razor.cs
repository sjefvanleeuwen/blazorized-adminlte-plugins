using BlazorMonacoYaml;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazorized.AdminLte.Plugins
{
    public partial class YamlEditor
    {
        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        private MonacoEditorYaml _yamlEditor { get; set; }

        [Parameter]
        public string Value { get; set; }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await JSRuntime.InvokeAsync<object>("splitYamlContentEditor", new object[] { DotNetObjectReference.Create(this), "InvokeLayout" }).ConfigureAwait(false);
            }
            await base.OnAfterRenderAsync(firstRender).ConfigureAwait(false);
        }

        [JSInvokable("InvokeLayout")]
        public Task Layout()
        {
            return _yamlEditor.Layout();
        }
    }
}
